const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database and seed
connectDB().then(() => {
    seedTours();
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Import Routes
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Use Routes
app.use('/api/users', userRoutes);



app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets', ticketRoutes);

const Tour = require('./models/Tour');
const tours = [
    { id: 1, imgSrc: 'img11.jpg', destTitle: 'DIANI', location: 'Coastal Kenya', category: 'Beach', fees: '21000', grade: 'CULTURAL RELAX', description: 'Enjoy the white sandy beaches of Diani with a luxury stay and coastal tours.' },
    { id: 2, imgSrc: 'img12.jpg', destTitle: 'MAASAI MARA', location: 'Rift Valley', category: 'Safari', fees: '35000', grade: 'CULTURAL RELAX', description: 'Experience the world-famous wildebeest migration and stay in premium safari camps.' },
    { id: 3, imgSrc: 'img18.jpg', destTitle: 'AMBOSELI', location: 'Southern Kenya', category: 'Safari', fees: '28000', grade: 'CULTURAL RELAX', description: 'Get the best views of Mt. Kilimanjaro and see massive herds of elephants.' },
    { id: 4, imgSrc: 'img10.jpg', destTitle: 'MT. KENYA', location: 'Central Kenya', category: 'Mountain', fees: '18000', grade: 'CULTURAL RELAX', description: 'Challenge yourself with a trek up Africa\'s second highest peak with local guides.' },
    { id: 5, imgSrc: 'img16.jpg', destTitle: 'NAIROBI CITY', location: 'Nairobi', category: 'City', fees: '12000', grade: 'CULTURAL RELAX', description: 'Discover the vibrant capital city, from national parks to local craft markets.' },
    { id: 6, imgSrc: 'img14.jpg', destTitle: 'MALINDI', location: 'Coastal Kenya', category: 'Beach', fees: '24000', grade: 'CULTURAL RELAX', description: 'Relax in the beautiful coastal town known for its beaches and marine parks.' }
];

const seedTours = async () => {
    try {
        const count = await Tour.countDocuments();
        if (count === 0) {
            await Tour.insertMany(tours);
            console.log('Database seeded with original tour packages!');
        }

        const User = require('./models/User');
        const adminEmail = 'admin@eventours.com';
        let adminUser = await User.findOne({ email: adminEmail });

        if (!adminUser) {
            await User.create({
                username: 'admin',
                email: adminEmail,
                password: 'adminpassword123',
                role: 'admin'
            });
            console.log('Admin user created: admin@eventours.com / adminpassword123');
        } else {
            // Force reset password to ensure it matches current hashing
            adminUser.password = 'adminpassword123';
            adminUser.role = 'admin';
            await adminUser.save();
            console.log('Admin password refreshed to: adminpassword123');
        }
    } catch (err) {
        console.error('Auto-seeding error:', err);
    }
};

// Seed database - handled in connectDB promise

app.get('/', (req, res) => {
    res.send('API is running and seeded...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

module.exports = app;
