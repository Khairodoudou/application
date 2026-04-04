const { createClient } = require('@libsql/client');
const client = createClient({
  url: 'libsql://healthaegis-db-kheireddine23.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzUyNjAxMzgsImlkIjoiMDE5ZDU1YmUtNDYwMS03MWMzLWI5ZTEtZjUyMWY3Mzc3ODQxIiwicmlkIjoiYzc1NGRjNzUtOTZkNS00ODc2LWJlNDYtYTEwYjc5YzE2ZjBhIn0.PjKfGfp_H7P-wM3RWbKme5UvOtZ6iEjfVmVLh10MmGcLCp0THn82vkQxFczAYtpOt8FJ21JtG65N_j6rdXW8Dw'
});

async function setup() {
  const tables = [
    'CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, phone TEXT, avatar TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)',
    'CREATE TABLE IF NOT EXISTS DoctorProfile (id TEXT PRIMARY KEY, userId TEXT UNIQUE NOT NULL, specialty TEXT NOT NULL, licenseNumber TEXT UNIQUE NOT NULL, clinicAddress TEXT NOT NULL, bio TEXT, consultationFee REAL, gender TEXT, yearsOfExperience INTEGER, spokenLanguages TEXT, city TEXT, country TEXT, consultationMode TEXT, linkedin TEXT, whatsapp TEXT, telegram TEXT, googleMapsLink TEXT, subscriptionStatus TEXT DEFAULT "PENDING", subscriptionStart DATETIME, subscriptionEnd DATETIME, availability TEXT, latitude REAL, longitude REAL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS HealthProfile (id TEXT PRIMARY KEY, userId TEXT UNIQUE NOT NULL, birthDate DATETIME, gender TEXT, height REAL, weight REAL, bloodType TEXT, diet TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS DoctorPatient (id TEXT PRIMARY KEY, doctorId TEXT NOT NULL, patientId TEXT NOT NULL, status TEXT DEFAULT "ACTIVE", notes TEXT, diseases TEXT, allergies TEXT, medications TEXT, medicalHistory TEXT, familyHistory TEXT, surgeryHistory TEXT, bloodPressure TEXT, heartRate INTEGER, temperature REAL, symptoms TEXT, diagnosis TEXT, treatmentPlan TEXT, examsRequested TEXT, observation TEXT, recommendations TEXT, documents TEXT, nextConsultation DATETIME, consultationReason TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (doctorId) REFERENCES User(id) ON DELETE CASCADE, FOREIGN KEY (patientId) REFERENCES User(id) ON DELETE CASCADE, UNIQUE(doctorId, patientId))',
    'CREATE TABLE IF NOT EXISTS Appointment (id TEXT PRIMARY KEY, doctorId TEXT NOT NULL, patientId TEXT NOT NULL, date DATETIME NOT NULL, duration INTEGER DEFAULT 30, type TEXT DEFAULT "CONSULTATION", status TEXT DEFAULT "PENDING", notes TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (doctorId) REFERENCES User(id) ON DELETE CASCADE, FOREIGN KEY (patientId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS Message (id TEXT PRIMARY KEY, senderId TEXT NOT NULL, receiverId TEXT NOT NULL, content TEXT NOT NULL, read INTEGER DEFAULT 0, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE, FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS FoodScan (id TEXT PRIMARY KEY, userId TEXT NOT NULL, productName TEXT NOT NULL, barcode TEXT, brand TEXT, imageUrl TEXT, ingredients TEXT NOT NULL, result TEXT NOT NULL, dangerousIngredients TEXT, recommendation TEXT NOT NULL, nutriscore TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS Report (id TEXT PRIMARY KEY, userId TEXT NOT NULL, type TEXT DEFAULT "ISSUE", subject TEXT NOT NULL, message TEXT NOT NULL, productName TEXT, barcode TEXT, imageUrl TEXT, status TEXT DEFAULT "PENDING", createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS Notification (id TEXT PRIMARY KEY, userId TEXT NOT NULL, title TEXT NOT NULL, message TEXT NOT NULL, type TEXT NOT NULL, link TEXT, read INTEGER DEFAULT 0, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)',
    'CREATE TABLE IF NOT EXISTS AppSetting (id TEXT PRIMARY KEY, supportEmail TEXT, adminPhone TEXT, headOffice TEXT, facebook TEXT, instagram TEXT, linkedin TEXT, googleMapsUrl TEXT, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)'
  ];

  for (const t of tables) {
    await client.execute(t);
    console.log('Table created');
  }

  await client.execute({
    sql: 'INSERT OR IGNORE INTO User (id, email, password, role, firstName, lastName, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
    args: ['admin_001', 'dahloumdouniahana@gmail.com', '/IBq3q1zLRNkr9wuRi6c7wqRnNYPa/Lh9MEFgDQnhr3hDqa', 'ADMIN', 'Dounia', 'Admin']
  });
  console.log('Admin created!');
}

setup().catch(console.error);
