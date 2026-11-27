export const CLINIC_INFO = {
    name: "Kaushish PhysioTherapy",
    tagline: "Precision Kinetic Medicine & Restorative Rehabilitation",
    phone: "+91 9368869685",
    email: "k4kuldeeep@gmail.com",
    address: "E.K. Road, Near Sainik Board, Meerut, Uttar Pradesh, India",
    hours: "Mon – Fri: 7:00 AM – 7:30 PM | Sat: 8:00 AM – 4:00 PM",
    stats: [
        { value: "99.4%", label: "Patient Recovery Success Rate", detail: "Clinical resolution within planned protocol" },
        { value: "18,400+", label: "Targeted Sessions Completed", detail: "Specialized non-invasive musculoskeletal therapies" },
        { value: "4.98 ★", label: "Average Patient Rating", detail: "From 1,200+ verified recovery reviews" },
        { value: "12+", label: "Board-Certified Specialists", detail: "Doctors of Physical Therapy & Olympic fellows" }
    ]
};

export const SPECIALISTS = [{
        id: "dr-muskan",
        name: "Dr. Muskan, P.T.",
        role: " Director & Spine Specialist",
        experience: "5+ Years Experience",
        credentials: "Board-Certified Orthopedic Clinical Specialist",
        rating: 4.99,
        reviewsCount: 384,
        avatar: "",
        specialties: ["Spinal Decompression", "Disc Herniation Protocols", "Cervical Alignment"],
        bio: "Dr. Muskan is globally recognized for non-surgical spine restoration, helping over 5,000 patients avoid invasive spinal fusions with precision kinetic alignment."
    },


    {
        id: "dr-kuldeep",
        name: "Dr. Kuldeep, P.T.",
        role: "Lead Post-Operative Rehabilitation Specialist",
        experience: "2+ Years Experience",
        credentials: "Fellow of the American Academy of Orthopaedic Manual Physical Therapists",
        rating: 4.99,
        reviewsCount: 320,
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
        specialties: ["Total Joint Replacements", "Complex Ligament Reconstruction", "Scar Tissue Release"],
        bio: "Dr. Kuldeep guides post-surgical patients through gentle, evidence-based joint mobilizations that accelerate tissue healing and eliminate range-of-motion deficits."
    }
];

export const SERVICES = [{
        id: "spine-decompression",
        title: "Spinal Decompression & Posture Architecture",
        category: "Spine & Neck",
        duration: "45 mins",
        price: 700,
        tag: "Most Requested",
        description: "Computerized axial decompression combined with manual facet joint mobilization to relieve pinched nerves, sciatica, and disc bulges.",
        recommendedFor: ["Lumbar Disc Herniation", "Sciatic Radiating Pain", "Cervical Radiculopathy", "Chronic Stiff Neck"],
        techniques: ["Axial Decompression", "Maitland Joint Mobilization", "McKenzie Protocol"],
        leadSpecialist: "dr-muskan",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sports-biomechanics",
        title: "High-Performance Sports Kinetics & ACL Return",
        category: "Sports Rehab",
        duration: "45 mins",
        price: 1000,
        tag: "Athletic Excellence",
        description: "Multi-camera motion analysis, force plate tracking, and eccentric strength protocols designed to rebuild explosive strength post-injury.",
        recommendedFor: ["ACL / PCL Tears", "Runner's Knee (Patellofemoral)", "Hamstring Strains", "Ankle Sprains"],
        techniques: ["Force Vector Loading", "Neuromuscular Re-education", "Plyometric Progressions"],
        leadSpecialist: "dr-muskan",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "post-op-joint",
        title: "Post-Surgical Joint & Ligament Restoration",
        category: "Post-Operative",
        duration: "45 mins",
        price: 1000,
        tag: "Care Protocol",
        description: "Phased, protective joint therapy tailored to orthopedic surgeon guidelines to preserve implants, restore flexion, and halt scar adhesion.",
        recommendedFor: ["Hip & Knee Arthroplasty", "Rotator Cuff Repair", "Spinal Fusion Recovery", "Meniscus Repair"],
        techniques: ["Continuous Passive Motion", "Lymphatic Drainage", "Isometric Stabilization"],
        leadSpecialist: "dr-muskan",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "ergonomic-longevity",
        title: "Executive Ergonomic & Postural Rebalancing",
        category: "Wellness & Preventive",
        duration: "45 mins",
        price: 700,
        tag: "Modern Lifestyle",
        description: "Correct desk-bound kyphosis, forward head translation, and pelvic tilts through targeted thoracic mobility and deep core activation.",
        recommendedFor: ["Tech Neck & Headaches", "Anterior Pelvic Tilt", "Thoracic Outlet Strains", "Sedentary Fatigue"],
        techniques: ["Thoracic Cavity Mobilization", "Scapular Stabilization", "Custom Ergonomic Blueprint"],
        leadSpecialist: "dr-muskan",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "pelvic-core",
        title: "Pelvic Floor & Lumbopelvic Stabilization",
        category: "Specialized Health",
        duration: "45 mins",
        price: 700,
        tag: "Holistic Care",
        description: "Gentle internal and external biofeedback therapy restoring pelvic diaphragm tone, breathing mechanics, and sacroiliac stability.",
        recommendedFor: ["Sacroiliac (SI) Joint Pain", "Postpartum Core Weakness", "Diastasis Recti", "Hip Impingement"],
        techniques: ["Real-Time Ultrasound Biofeedback", "Diaphragmatic Breathing", "Core Kinetic Slings"],
        leadSpecialist: "dr-muskan",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    }
];

export const SYMPTOM_BODY_ZONES = [{
        id: "cervical",
        title: "Neck & Upper Spine",
        subtitle: "Cervical & Upper Trapezius",
        commonComplaints: "Stabbing pinch when turning head, radiating arm tingling, tension behind temples.",
        recommendedServiceId: "dry-needling",
        recoveryTimeline: "2 to 4 weeks",
        recommendedSpecialist: "dr-muskan"
    },
    {
        id: "lumbar",
        title: "Lower Back & Sciatica",
        subtitle: "Lumbar L3-S1 & Gluteal",
        commonComplaints: "Sharp electric shooting down the leg, morning stiffness, difficulty standing straight.",
        recommendedServiceId: "spine-decompression",
        recoveryTimeline: "4 to 6 weeks",
        recommendedSpecialist: "dr-muskan"
    },
    {
        id: "shoulder",
        title: "Shoulder & Rotator Cuff",
        subtitle: "Glenohumeral & Scapula",
        commonComplaints: "Inability to sleep on side, pain reaching overhead, clicking and weakness when lifting.",
        recommendedServiceId: "dry-needling",
        recoveryTimeline: "3 to 6 weeks",
        recommendedSpecialist: "dr-muskan"
    },
    {
        id: "knee",
        title: "Knee & Ligaments",
        subtitle: "Patella, Meniscus & ACL",
        commonComplaints: "Instability going down stairs, deep joint swelling, snapping sensation during pivots.",
        recommendedServiceId: "sports-biomechanics",
        recoveryTimeline: "6 to 8 weeks",
        recommendedSpecialist: "dr-muskan"
    },
    {
        id: "hip",
        title: "Hip & Pelvis",
        subtitle: "Acetabular & SI Joint",
        commonComplaints: "Deep groin pinch when sitting, SI joint ache after walking, restricted hip rotation.",
        recommendedServiceId: "pelvic-core",
        recoveryTimeline: "4 to 7 weeks",
        recommendedSpecialist: "dr-muskan"
    },
    {
        id: "ankle",
        title: "Ankle & Achilles",
        subtitle: "Talocrural & Plantar Fascia",
        commonComplaints: "First steps in morning feel like stepping on glass, recurring sprains, tendon tightness.",
        recommendedServiceId: "sports-biomechanics",
        recoveryTimeline: "3 to 5 weeks",
        recommendedSpecialist: "dr-muskan"
    }
];

export const INITIAL_TESTIMONIALS = [{
        id: "test-1",
        name: "Anamika Gupta",
        title: "Classical Pianist & Educator",
        age: "32",
        condition: "Lumbar Disc Herniation (L4-L5) & Sciatica",
        category: "Spine & Disc",
        rating: 5,
        avatar: "/KDC-Photos/Anamika-gupta.jpg",
        quote: "I was scheduled for spinal microdiscectomy surgery after 18 months of debilitating sciatica that left me unable to sit at my piano for more than 10 minutes. Dr. Muskan’s computerized decompression protocol and hands-on realignment completely turned my life around. By week 4, the nerve pain vanished. I just played my first solo recital in two years, completely pain-free.",
        metrics: {
            painBefore: "9/10",
            painAfter: "0/10",
            mobilityGain: "+92%",
            duration: "6 Weeks Protocol"
        },
        therapist: "Dr. Muskan, P.T.",
        verified: true,
        highlight: "Avoided spinal surgery; 100% pain-free"
    },
    {
        id: "test-2",
        name: "Dharma Singh",
        title: "Marathon Runner & Tech Founder",
        age: "36",
        condition: "Post-Op ACL Reconstruction & Patellar Tendinopathy",
        category: "Sports Rehab",
        rating: 5,
        avatar: "/KDC-Photos/Dharma-singh.jpg",
        quote: "My surgeon told me returning to sub-3-hour marathons would take at least 18 months. Dr. Muskan used 3D motion tracking and eccentric force vectors that targeted the exact neuromuscular deficits in my left quad. Her scientific approach gave me confidence every single week. At month 7, I set a personal best on a 20-mile mountain training run.",
        metrics: {
            painBefore: "8/10",
            painAfter: "0/10",
            mobilityGain: "+96%",
            duration: "8 Weeks Protocol"
        },
        therapist: "Dr. Muskan, P.T.",
        verified: true,
        highlight: "Shattered recovery timeline by 6 months"
    },
    {
        id: "test-3",
        name: "Meera Desai",
        title: "Interior Architect",
        age: "28",
        condition: "Frozen Shoulder (Adhesive Capsulitis - Stage 2)",
        category: "Shoulder & Neck",
        rating: 5,
        avatar: "/KDC-Photos/Meera-desai.jpg",
        quote: "I couldn't reach behind my back to fasten my dress or sleep on my right side without waking up in tears. Conventional therapy elsewhere only caused severe flare-ups. Dr. Muskan's gentle combination of dry needling and deep fascial manipulation released the deep joint capsule without aggressive force. My range of motion went from 55 degrees to full 175 degrees.",
        metrics: {
            painBefore: "8.5/10",
            painAfter: "1/10",
            mobilityGain: "+120° Flexion",
            duration: "5 Weeks Protocol"
        },
        therapist: "Dr. Muskan, P.T.",
        verified: true,
        highlight: "Restored full 175° overhead shoulder reach"
    },
    {
        id: "test-4",
        name: "Omkar Mehta",
        title: "Manager, Tech Startup",
        age: "44",
        condition: "Chronic Cervicogenic Migraines & Tech Neck",
        category: "Spine & Disc",
        rating: 5,
        avatar: "/KDC-Photos/Omkar-metha.jpg",
        quote: "Twelve hours a day across laptops and flights had caused severe forward head posture and three debilitating migraines every single week. Dr. Muskan treats the human body like an architectural masterpiece. After 6 sessions of cervical spine decompression and scapular balancing, my migraines have ceased entirely for 4 consecutive months.",
        metrics: {
            painBefore: "8/10",
            painAfter: "0/10",
            mobilityGain: "+88%",
            duration: "4 Weeks Protocol"
        },
        therapist: "Dr. Muskan, P.T.",
        verified: true,
        highlight: "Zero migraines in 4 months after 6 sessions"
    },
    {
        id: "test-5",
        name: "Anjali Kapoor",
        title: "Professional Contemporary Dancer",
        age: "29",
        condition: "Sacroiliac (SI) Joint Dysfunction & Labral Tear",
        category: "Pelvic & Core",
        rating: 5,
        avatar: "/KDC-Photos/Anjali-Kapoor.jpg",
        quote: "As a dancer, my career depends on subtle micro-adjustments in pelvis stability. Dr. Muskan was extraordinarily knowledgeable about athletic dance physiology. We rebuilt my pelvic sling using real-time biofeedback and joint balancing. I returned to center stage in Paris with more stability than before my injury.",
        metrics: {
            painBefore: "7/10",
            painAfter: "0/10",
            mobilityGain: "+95%",
            duration: "7 Weeks Protocol"
        },
        therapist: "Dr. Muskan, P.T.",
        verified: true,
        highlight: "Returned to international stage performance"
    }
];

export const FAQS = [{
        q: "Do I require a medical doctor's referral to book a consultation?",
        a: "No, you can book directly with us without a prior referral. Our physiotherapists perform a complete physical and movement assessment on your first visit. However, if you already have an MRI, X-Ray, or doctor's prescription, please bring it along so we can review it together."
    },
    {
        q: "How does Kaushish Physiotherapy & Rehabilitation center differ from standard physical therapy clinics?",
        a: "Unlike busy clinics where one therapist attends 3–4 patients at once, at Kaushish Physiotherapy & Rehabilitation center every patient receives dedicated 1-on-1 attention for 45 to 60 minutes. We combine hands-on manual therapy, spinal decompression, and targeted exercises tailored to your exact condition."
    },
    {
        q: "Do you provide home-visit physiotherapy for senior citizens or post-surgery patients?",
        a: "Yes. If you or a family member cannot travel due to severe back pain, stroke recovery, or recent knee/hip surgery, you can book our At-Home Visit option across Meerut, or choose HD Telehealth for online guidance."
    },
    {
        q: "What should I bring for my first visit, and how many sessions will it take to recover?",
        a: "Please wear loose, comfortable clothing and carry any recent X-Ray, MRI reports, or surgery discharge papers. On Day 1, we identify the root cause, give immediate pain-relief treatment, and share a clear recovery plan—most patients notice significant relief within 4 to 8 sessions."
    },
    {
        q: "What payment modes do you accept, and do you provide bills for Mediclaim reimbursement?",
        a: "We accept UPI (Google Pay, PhonePe, Paytm), Cash. We also provide proper stamped receipts and treatment summaries for corporate or Mediclaim reimbursement, subject to your policy terms."
    }
];

export const AVAILABLE_TIME_SLOTS = {
    morning: ["08:00 AM", "09:15 AM", "10:30 AM", "11:45 AM"],
    afternoon: ["01:00 PM", "02:15 PM", "03:30 PM", "04:45 PM"],
    evening: ["05:45 PM", "06:30 PM", "07:15 PM"]
};