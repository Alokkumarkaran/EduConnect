
Next.js + MySQL — EduConnect

Two pages per assignment:
pages/addSchool.jsx** — Add school with `react-hook-form`, server-side validation, image upload to `public/schoolImages`.
pages/showSchools.jsx** — Grid listing of schools showing name, address, city, image.

Tech
- Next.js (Pages Router)
- MySQL with `mysql2`
- `formidable` for handling multipart/form-data and saving images
- Tailwind CSS for quick responsive UI

Setup

1) Install dependencies

npm install (with dependencies name)

2) Configure environment

.env.local
Fill MYSQL_* values

3) Create database & table

In your MySQL client
SOURCE schema.sql;

4) Run dev server

npm run dev

5) Images uploaded via the form are saved to /public/schoolImages.

Notes
- Images are saved under `public/schoolImages`. In serverless environments like Vercel, file-system writes are not persistent. For production, use a storage bucket (e.g., S3, Cloudinary) and save the returned URL in the `image` column. For the assignment/local demo this approach works fine.
- Basic server-side validations are added (email, contact, required fields).
- The `contact` column is VARCHAR to preserve leading + and avoid integer overflow.
