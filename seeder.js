const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const tours = [
    { id: 1, imgSrc: 'img11.jpg', destTitle: 'DIANI', location: 'Coastal Kenya', category: 'Beach', fees: '21000', grade: 'CULTURAL RELAX', description: 'Enjoy the white sandy beaches of Diani with a luxury stay and coastal tours.' },
    { id: 2, imgSrc: 'img12.jpg', destTitle: 'MAASAI MARA', location: 'Rift Valley', category: 'Safari', fees: '35000', grade: 'CULTURAL RELAX', description: 'Experience the world-famous wildebeest migration and stay in premium safari camps.' },
    { id: 3, imgSrc: 'img18.jpg', destTitle: 'AMBOSELI', location: 'Southern Kenya', category: 'Safari', fees: '28000', grade: 'CULTURAL RELAX', description: 'Get the best views of Mt. Kilimanjaro and see massive herds of elephants.' },
    { id: 4, imgSrc: 'img10.jpg', destTitle: 'MT. KENYA', location: 'Central Kenya', category: 'Mountain', fees: '18000', grade: 'CULTURAL RELAX', description: 'Challenge yourself with a trek up Africa\'s second highest peak with local guides.' },
    { id: 5, imgSrc: 'img16.jpg', destTitle: 'NAIROBI CITY', location: 'Nairobi', category: 'City', fees: '12000', grade: 'CULTURAL RELAX', description: 'Discover the vibrant capital city, from national parks to local craft markets.' },
    { id: 6, imgSrc: 'img14.jpg', destTitle: 'MALINDI', location: 'Coastal Kenya', category: 'Beach', fees: '24000', grade: 'CULTURAL RELAX', description: 'Relax in the beautiful coastal town known for its beaches and marine parks.' }
];

const importData = async () => {
    try {
        await Tour.deleteMany();
        await Tour.insertMany(tours);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
