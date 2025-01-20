import fs from "fs";
import path from "path";

interface Company {
  id: number;
  logo: string;
  name: string;
  status: "Active" | "Inactive";
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: "Writer" | "Editor";
  status: "Active" | "Inactive";
}

interface Article {
  id: number;
  image: string;
  title: string;
  link: string;
  date: string;
  content: string;
  status: "Published" | "For Edit";
  writer: number | string | null;
  editor: number | string | null;
  company: number | string | null;
}

interface Data {
  companies: Company[];
  users: User[];
  articles: Article[];
}

// Use __dirname to ensure correct relative path
const filePath = path.join(process.cwd(), "app", "data", "data.json");
console.log("Resolved file path:", filePath);

export const ensureDataFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({ companies: [], users: [], articles: [] }, null, 2));
  }
};

export const readData = (): Data => {
    ensureDataFile(); // Ensure the file exists
    const rawData = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(rawData); // Parse the JSON content
    console.log("Read data:", parsedData); // Log the data read from the file
    return parsedData;
  };
  

export const writeData = (data: Data): void => {
  ensureDataFile();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


// import fs from "fs";
// import path from "path";

// interface Company {
//   id: number;
//   logo: string;
//   name: string;
//   status: "Active" | "Inactive";
// }

// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   username: string;
//   password: string;
//   type: "Writer" | "Editor";
//   status: "Active" | "Inactive";
// }

// interface Article {
//   id: number;
//   image: string;
//   title: string;
//   link: string;
//   date: string;
//   content: string;
//   status: "Published" | "For Edit";
//   writer: number | string | null;
//   editor: number | string | null;
//   company: number | string | null;
// }

// interface Data {
//   companies: Company[];
//   users: User[];
//   articles: Article[];
// }

// // Define a temporary file path using the /tmp directory in Vercel
// const tmpFilePath = path.join("/tmp", "data.json");
// console.log("Resolved file path:", tmpFilePath);

// // Ensure the data file exists in the /tmp directory
// export const ensureDataFile = () => {
//   if (!fs.existsSync(tmpFilePath)) {
//     // Create directory for file if it doesn't exist
//     fs.mkdirSync(path.dirname(tmpFilePath), { recursive: true });
//     // Initialize the file with default data
//     fs.writeFileSync(tmpFilePath, JSON.stringify({ companies: [], users: [], articles: [] }, null, 2));
//   }
// };

// // Read data from the temporary file
// export const readData = (): Data => {
//   ensureDataFile(); // Ensure the file exists
//   const rawData = fs.readFileSync(tmpFilePath, "utf8");
//   const parsedData = JSON.parse(rawData); // Parse the JSON content
//   console.log("Read data:", parsedData); // Log the data read from the file
//   return parsedData;
// };

// // Write data to the temporary file
// export const writeData = (data: Data): void => {
//   ensureDataFile();
//   fs.writeFileSync(tmpFilePath, JSON.stringify(data, null, 2));
// };
