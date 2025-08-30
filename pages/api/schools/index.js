
import { getPool } from '../../../lib/db';

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const pool = getPool();
      const [rows] = await pool.query('SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC');
      return res.status(200).json({ success: true, data: rows });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      await fs.promises.mkdir(uploadDir, { recursive: true });

      const form = formidable({
        multiples: false,
        uploadDir,
        keepExtensions: true,
        filename: (name, ext, part) => {
          const timestamp = Date.now();
          const safe = (part.originalFilename || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
          return `${timestamp}-${safe}`;
        },
      });

      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

      const name = (fields.name || '').toString().trim();
      const address = (fields.address || '').toString().trim();
      const city = (fields.city || '').toString().trim();
      const state = (fields.state || '').toString().trim();
      const contact = (fields.contact || '').toString().trim();
      const email_id = (fields.email_id || '').toString().trim();
      const fileObj = files.image;

    
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
      }
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
      if (!emailRegex.test(email_id)) {
        return res.status(400).json({ success: false, error: 'Invalid email address.' });
      }
      if (!/^\+?\d{7,15}$/.test(contact)) {
        return res.status(400).json({ success: false, error: 'Invalid contact number.' });
      }

      let imagePath = '';
      if (fileObj && Array.isArray(fileObj)) {
       
        imagePath = '/schoolImages/' + path.basename(fileObj[0].filepath || fileObj[0].originalFilename || '');
      } else if (fileObj) {
        imagePath = '/schoolImages/' + path.basename(fileObj.filepath || fileObj.originalFilename || '');
      }

      const pool = getPool();
      await pool.query(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, imagePath, email_id]
      );

      return res.status(201).json({ success: true, message: 'School added successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Error saving school.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
