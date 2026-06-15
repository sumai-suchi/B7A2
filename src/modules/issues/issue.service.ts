import { pool } from "../../db/database";
import type { Issue, IssueQuery, User } from "./issue.interface";


const createIssueIntoDB= async (payload : Issue , reporter_id : number)=>{
    const {title, description, type}= payload;

  

    const result = await pool.query(`
        INSERT INTO issues (title, description, type ,reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,[title, description, type, reporter_id])
        
      console.log(result.rows[0]);
      return result
}






export const getAllIssuesService = async (queryParams: IssueQuery) => {
  const { sort = "newest", type, status } = queryParams;
//   console.log(queryParams);

  let query = `
    SELECT *
    FROM issues
    WHERE 1=1
  `;

  const values: any[] = [];
  let count = 1;

  // filter: type
  if (type) {
    query += ` AND type = $${count++}`;
    values.push(type);
  }

  // filter: status
  if (status) {
    query += ` AND status = $${count++}`;
    values.push(status);
  }

  // sorting
  query += `
    ORDER BY created_at ${
      sort === "oldest" ? "ASC" : "DESC"
    }
  `;

  // step 1: get issues
  const issuesResult = await pool.query(query, values);
  const issues = issuesResult.rows;

  if (issues.length === 0) return [];

  // step 2: extract reporter ids
  const reporterIds = [
    ...new Set(issues.map((i) => i.reporter_id)),
  ];

  // step 3: get users
  const usersResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = ANY($1)
    `,
    [reporterIds]
  );

  // step 4: create map
  const reporterMap = new Map(
    usersResult.rows.map((user) => [user.id, user])
  );

  // step 5: attach reporter to issues
  const formattedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterMap.get(issue.reporter_id),
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return formattedIssues;
};



 const updateIssueService = async (
  issueId: number,
  user: User,
  payload: Issue
) => {
  const { title, description, type } = payload;

  console.log(issueId, user, payload);

  // 1. Get issue first
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  // 2. Permission check
  const isMaintainer = user.role === "maintainer";
  const isOwner = issue.reporter_id === user.id;

  if (!isMaintainer) {
    // contributor rules
    if (!isOwner) {
      throw new Error("You cannot update this issue");
    }

    if (issue.status !== "open") {
      throw new Error("You can only update open issues");
    }
  }

  // 3. Build dynamic update query
  let query = `UPDATE issues SET `;


  const values: any[] = [];


  let count = 1;

  if (title) {
    query += `title = $${count++}, `;
    values.push(title);
  }

  if (description) {
    query += `description = $${count++}, `;


    values.push(description);
  }

  if (type) {
    query += `type = $${count++}, `;

    values.push(type);
  }

  // always update timestamp
  query += `updated_at = NOW() `;

  // WHERE condition
  query += `WHERE id = $${count++} RETURNING *`;
        values.push(issueId);

  // 4. Run update
  const updatedResult = await pool.query(query, values);

  return updatedResult.rows[0];
};


const deleteIssueService = async (issueId: number) => {

  // 1. check if issue exists
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  // 2. delete issue
  await pool.query(
    `DELETE FROM issues WHERE id = $1`,
    [issueId]
  );

  return true;
};

 const getSingleIssueService = async (issueId: number) => {

  // 1. Get issue
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  // 2. Get reporter
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id]
  );

  const reporter = userResult.rows[0];

  // 3. Format response
  const formattedIssue = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporter || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return formattedIssue;
};



export const issueService={
    createIssueIntoDB,
    getAllIssuesService,
    updateIssueService,
    deleteIssueService,
    getSingleIssueService
}

