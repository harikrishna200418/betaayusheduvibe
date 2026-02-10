/* 
  MOCK DATABASE (data.js)
  This file contains all the dynamic data for the website.
  In a real app, this would come from a backend server/database.
*/

const APP_DATA = {
    universities: [
        {
            id: 1,
            name: "Harvard University",
            country: "USA",
            flag: "🇺🇸",
            rank: "#1 Ranked",
            location: "Cambridge, MA, USA",
            scholarship: { title: "SCHOLARSHIP ALERT", desc: "Full Tuition Coverage Available", color: "#00f3ff" }
        },
        {
            id: 2,
            name: "University of Oxford",
            country: "UK",
            flag: "🇬🇧",
            rank: "#2 Ranked",
            location: "Oxford, UK",
            scholarship: { title: "Rhodes Scholarship", desc: "Full Funding + Stipend", color: "#bc13fe" }
        },
        {
            id: 3,
            name: "University of Toronto",
            country: "Canada",
            flag: "🇨🇦",
            rank: "#18 Ranked",
            location: "Toronto, Canada",
            scholarship: { title: "Lester B. Pearson", desc: "Covering Tuition, Books, Residence", color: "#00ff88" }
        },
        {
            id: 4,
            name: "University of Melbourne",
            country: "Australia",
            flag: "🇦🇺",
            rank: "#33 Ranked",
            location: "Melbourne, Australia",
            scholarship: null
        },
        {
            id: 5,
            name: "Technical University of Munich",
            country: "Germany",
            flag: "🇩🇪",
            rank: "#50 Ranked",
            location: "Munich, Germany",
            scholarship: { title: "DAAD Scholarship", desc: "Monthly Stipend Available", color: "#ff0055" }
        }
    ],

    jobs: [
        {
            id: 1,
            title: "Campus Ambassador",
            type: "Part-Time",
            company: "Google Student Club",
            location: "Remote",
            salary: "₹5,000 / month",
            tagClass: "tag-popular"
        },
        {
            id: 2,
            title: "Junior Web Developer",
            type: "Full-Time",
            company: "TechStart Solutions",
            location: "Bangalore",
            salary: "₹4.5 LPA",
            tagClass: "tag-free"
        },
        {
            id: 3,
            title: "Data Entry Specialist",
            type: "Part-Time",
            company: "Global Data Corp",
            location: "Work from Home",
            salary: "₹8,000 / month",
            tagClass: "tag-popular"
        },
        {
            id: 4,
            title: "Content Writer",
            type: "Part-Time",
            company: "MediaHouse",
            location: "Mumbai",
            salary: "₹1.20 per word",
            tagClass: "tag-popular"
        },
        {
            id: 5,
            title: "Delivery Partner",
            type: "Full-Time",
            company: "FastDelivery",
            location: "Delhi NCR",
            salary: "₹20,000 / month",
            tagClass: "tag-free"
        }
    ],

    exams: {
        free: [
            { name: "IELTS", desc: "Practice Tests & Tips", link: "https://ieltsidpindia.com/" },
            { name: "DET", desc: "Duolingo English Test", link: "https://englishtest.duolingo.com/applicants" },
            { name: "PTE", desc: "Pearson Test of English", link: "https://www.pearsonpte.com/pte-academic" },
            { name: "TOEFL", desc: "Test of English as Foreign Language", link: "https://www.ets.org/toefl.html" },
            { name: "Free Material", desc: "Access study materials" }
        ],
        paid: [
            { price: "₹99", name: "Basic Crash Course", features: ["1 Mock Test", "Study Material PDF"], color: "var(--primary)" },
            { price: "₹199", name: "Standard Pack", features: ["5 Mock Tests", "Video Lessons", "Study Material"], color: "var(--secondary)" },
            { price: "₹299", name: "Pro Pack", features: ["10 Mock Tests", "Live Doubt Clearing", "Essay Correction"], color: "var(--accent)" },
            { price: "₹499", name: "Ultimate Access", features: ["Unlimited Tests", "1-on-1 Coaching", "Visa Guidance"], color: "#ffffff" }
        ]
    },

    accommodation: [
        {
            id: 1,
            title: "Shared Apartment",
            location: "Near London University",
            price: "£600 / month",
            image: "images/shared_apartment_london.png"
        },
        {
            id: 2,
            title: "Student Dorm",
            location: "Berlin Campus",
            price: "€400 / month",
            image: "images/student_dorm_berlin.png"
        },
        {
            id: 3,
            title: "Private Studio",
            location: "Toronto Downtown",
            price: "$1200 / month",
            image: "images/private_studio_toronto.png"
        }
    ]
};
