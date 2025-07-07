"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Play,
  Star,
  Volume2,
  VolumeX,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Info,
  Award,
  Zap,
  Coffee,
  Brain,
  BriefcaseBusiness,
  CodeXml,
  Sparkles,
  Edit,
  Trash2 
} from "lucide-react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Environment,
} from "@react-three/drei";
import type * as THREE from "three";

// 3D Components
function AnimatedSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.x += 0.01;
          meshRef.current.rotation.y += 0.01;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere position={[-4, 2, 0]} color="#e50914" />
      <AnimatedSphere position={[4, -2, 0]} color="#ffffff" />
      <AnimatedSphere position={[0, 0, -2]} color="#b81d24" />
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

type Screen = "splash" | "profiles" | "main";
type UserProfile = "recruiter" | "developer" | "curious" | "innovator";
type Profile = {
  id: UserProfile;
  name: string;
  avatar: string;
  icon: any;
  color: string;
  hoverColor: string;
  iconColor: string;
  description: string;
};

interface Episode {
  id: number;
  title: string; // e.g., "Built and optimized interactive web applications", "Bachelor of Engineering"
  description: string; // e.g., "Using modern JavaScript frameworks...", "Chandigarh University, Mohali"
  duration: string; // This field now serves as "Additional Details" like "CGPA: 8.4/10" or "Skills: Python, MySQL"
  thumbnail: string; // Image relevant to the point (e.g., tech logo, project screenshot, institution logo)
  isWatched: boolean; // Represents completion (e.g., true for completed education/experience point)
  tags?: string[]; // Optional: for skills or keywords related to this point
}

// Updated Season interface for resume "sections" (Education, Experience)
interface Season {
  number: number;
  year: string; // Use string for years/date ranges like "2022 – Present" or "June 2025 – August 2025"
  title: string; // e.g., "EDUCATION", "Software Development Intern"
  description: string; // e.g., "Academic Journey & Achievements", "Celebal Technologies"
  location?: string; // Optional: For education institution or company location
  cgpaOrPercentage?: string; // Optional: For academic results directly on the season card
  episodesCount: number; // This is the corrected property name!
}

interface AchievementItem {
  id: number;
  name: string; // The event/achievement name to show on hover
  imageSrc: string; // Path to the image (certificate, award, project screenshot)
  category: string; // For internal categorization or potential future filtering
  fullDescription?: string; // Optional: for a potential modal if clicked
}

const achievements: AchievementItem[] = [
  {
    id: 1,
    name: "Core Member ISTE-CU Launch",
    imageSrc: "/techlead.jpg", // Placeholder: Replace with actual image
    category: "Leadership",
    fullDescription:
      "Recognized as a core member for the successful launch and establishment of the Indian Society for Technical Education (ISTE) chapter at Chandigarh University.",
  },
  {
    id: 2,
    name: "Top Performer Project Exhibition",
    imageSrc: "/project.jpg", // Placeholder: Replace with actual image
    category: "Project Excellence",
    fullDescription:
      "Awarded as a top performer in the university's project exhibition for an outstanding and impactful technical project.",
  },
  {
    id: 3,
    name: "Leadership Recognition",
    imageSrc: "/iste.jpg", // Placeholder: Replace with actual image
    category: "Leadership",
    fullDescription:
      "Acknowledged for exceptional leadership in various campus initiatives and student organizations.",
  },
  {
    id: 4,
    name: "Innovation in AI - HackWithIndia",
    imageSrc: "/hackwithindia.jpg", // Placeholder: Replace with actual image
    category: "Hackathon",
    fullDescription:
      "Recognized for innovative use of AI in a solution developed during the 'HackWithIndia' hackathon.",
  },
  {
    id: 5,
    name: "Best Diwali-Extravaganza Stall",
    imageSrc: "/diwali.jpg", // Placeholder: Replace with actual image
    category: "Event Management",
    fullDescription:
      "Secured the 'Best Stall' award at the university's annual Diwali Extravaganza for creativity and engagement.",
  },
  {
    id: 6,
    name: "Winner DSA Competition",
    imageSrc: "/dsa.jpg", // Placeholder: Replace with actual image
    category: "Competitive Programming",
    fullDescription:
      "Achieved first place in a highly competitive Data Structures and Algorithms (DSA) competition.",
  },
  {
    id: 7,
    name: "Liaison Officer - CU CAB Meeting 2025",
    imageSrc: "/cab.jpeg", // Placeholder: Replace with actual image
    category: "Coordination",
    fullDescription:
      "Served as the Liaison Officer for the prestigious Chandigarh University Campus Advisory Board (CAB) Meeting 2025.",
  },
  {
    id: 8,
    name: "Deputy Director General MUN'25",
    imageSrc: "/chairmun.jpeg", // Placeholder: Replace with actual image
    category: "Leadership",
    fullDescription:
      "Appointed as the Deputy Director General for Model United Nations (MUN) 2025, coordinating between committees and ensuring seamless operational excellence.",
  },
];

const allEpisodes: { [key: number]: Episode[] } = {
  // Season 1: EDUCATION
  1: [
    {
      id: 1,
      title: "Bachelor of Engineering (Computer Science)",
      description: "Chandigarh University, Mohali (2022 – Present)",
      duration: "CGPA: 8.4/10",
      thumbnail: "/cu.jpg", // Placeholder, replace with actual logo path
      isWatched: true,
    },
    {
      id: 2,
      title: "Intermediate (CBSE)",
      description: "GMSSS, Chandigarh (2021 – 2022)",
      duration: "Percentage: 88.7%",
      thumbnail: "/govt.jpeg", // Placeholder
      isWatched: true,
    },
    {
      id: 3,
      title: "Matriculation",
      description: "St. Xavier's High School (2019 – 2020)",
      duration: "Percentage: 93.2%",
      thumbnail: "/xav.png", // Placeholder
      isWatched: true,
    },
  ],

  // Season 2: EXPERIENCE - Software Development Intern – Celebal Technologies
  2: [
    {
      id: 1,
      title: "Built & optimized interactive web applications",
      description:
        "Using modern JavaScript frameworks and component-based design.",
      duration: "Key Skill: Frontend Development",
      thumbnail: "/cel.jpg", // Placeholder
      isWatched: true,
      tags: ["JavaScript", "React", "Web Applications", "UI/UX"],
    },
    {
      id: 2,
      title: "Automated backend workflows",
      description:
        "Used scripting and scheduling tools for real-time content delivery.",
      duration: "Key Skill: Backend Automation",
      thumbnail: "/auto.jpeg", // Placeholder
      isWatched: true,
      tags: ["Backend", "Scripting", "Automation"],
    },
    {
      id: 3,
      title: "Completed industry-aligned training & project evaluations",
      description: "Focused on full-stack development best practices.",
      duration: "Learning: Full-Stack Development",
      thumbnail: "/full.jpeg", // Placeholder
      isWatched: true,
      tags: ["Full-Stack", "Best Practices", "Training"],
    },
  ],

  // Season 3: EXPERIENCE - Cyber Security Technology Intern – CDAC Mohali
  3: [
    {
      id: 1,
      title: "Optimized MySQL databases with Python automation",
      description:
        "Integrated Elasticsearch & Kibana for real-time security monitoring.",
      duration: "Skills: Python, MySQL, Elasticsearch, Kibana",
      thumbnail: "/cdac.jpeg", // Placeholder
      isWatched: true,
      tags: [
        "Python",
        "MySQL",
        "Elasticsearch",
        "Kibana",
        "Database Optimization",
      ],
    },
    {
      id: 2,
      title: "Boosted pcap analysis speed by 35%",
      description:
        "Using Snort multiprocessing, eliminating alert.csv overlaps.",
      duration: "Key Skill: Network Security Analysis",
      thumbnail: "/snort.jpeg", // Placeholder
      isWatched: true,
      tags: [
        "Snort",
        "Pcap Analysis",
        "Cybersecurity",
        "Performance Optimization",
      ],
    },
    {
      id: 3,
      title: "Deployed via Docker on AWS",
      description:
        "Ensured data security compliance, and documented key cybersecurity processes.",
      duration: "Skills: Docker, AWS, Data Security",
      thumbnail: "/aws.jpeg", // Placeholder
      isWatched: true,
      tags: ["Docker", "AWS", "Cloud Deployment", "Cybersecurity Compliance"],
    },
  ],
};

const seasons: Season[] = [
  {
    number: 1,
    year: "2022 – Present",
    title: "EDUCATION",
    description: "Academic Journey & Foundational Knowledge",
    episodesCount: 3,
  },
  {
    number: 2,
    year: "June 2025 – August 2025",
    title: "Software Development Intern",
    description: "Celebal Technologies",
    location: "Jaipur, India",
    episodesCount: 3,
  },
  {
    number: 3,
    year: "May 2024 – July 2024",
    title: "Cyber Security Technology Intern",
    description: "CDAC Mohali",
    location: "Mohali, India",
    episodesCount: 3,
  },
];

export default function NetflixPortfolio() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [watchProgress, setWatchProgress] = useState(0);
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [showContinueWatching, setShowContinueWatching] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<
    "idle" | "fadeOut" | "fadeIn"
  >("idle");
  const [showManageProfiles, setShowManageProfiles] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefProfileClick = useRef<HTMLAudioElement>(null);

  // Splash screen timer with Netflix sound effect
  // Splash screen timer with Netflix sound effect
useEffect(() => {
  if (currentScreen === "splash") {
    const timer = setTimeout(() => {
      setTransitionPhase("fadeOut");
      setIsTransitioning(true);

      // Play Netflix sound effect
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(console.error);
      }

      // Transition to profiles more quickly
      setTimeout(() => {
        setTransitionPhase("fadeIn");
        setCurrentScreen("profiles");
      }, 800); // faster screen switch

      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionPhase("idle");
      }, 1000); // shorter overall duration
    }, 1500); // Start transition sooner (was 3000)
    
    return () => clearTimeout(timer);
  }
}, [currentScreen]);


  useEffect(() => {
    setIsVisible(true);
    if (currentScreen === "main") {
      const timer = setTimeout(() => {
        setShowSkipIntro(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWatchProgress((prev) => (prev < 100 ? prev + 0.5 : 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Particle animation canvas
  useEffect(() => {
    if (currentScreen !== "main") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      symbol: string;
    }> = [];

    const symbols = [
      "<",
      ">",
      "{",
      "}",
      "(",
      ")",
      "[",
      "]",
      ";",
      ":",
      "=",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "!",
      "?",
      "#",
    ];
    const colors = ["#e50914", "#ffffff", "#b81d24", "#f40612", "#831010"];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += dx * 0.00001;
          particle.vy += dy * 0.00001;
          particle.opacity = Math.min(1, particle.opacity + 0.02);
        } else {
          particle.opacity = Math.max(0.1, particle.opacity - 0.01);
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size * 8}px monospace`;
        ctx.fillText(particle.symbol, particle.x, particle.y);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mousePosition, currentScreen]);

  const profiles = [
    {
      id: "recruiter" as UserProfile,
      name: "Recruiter",
      description: "Seeking out top talent",
      icon: BriefcaseBusiness,
      avatar: "👔",
      color: "bg-gradient-to-br from-blue-700 to-blue-500",
      hoverColor: "hover:from-blue-600 hover:to-blue-400",
      iconColor: "text-blue-200",
    },
    {
      id: "developer" as UserProfile,
      name: "Developer",
      description: "Crafting digital experiences",
      icon: CodeXml,
      avatar: "👨‍💻",
      color: "bg-gradient-to-br from-green-700 to-green-500",
      hoverColor: "hover:from-green-600 hover:to-green-400",
      iconColor: "text-green-200",
    },
    {
      id: "curious" as UserProfile,
      name: "Curious Explorer",
      description: "Just discovering possibilities",
      icon: Sparkles,
      avatar: "🔍",
      color: "bg-gradient-to-br from-purple-700 to-purple-500",
      hoverColor: "hover:from-purple-600 hover:to-purple-400",
      iconColor: "text-purple-200",
    },
    {
      id: "innovator" as UserProfile,
      name: "Innovator",
      description: "Pioneering new solutions",
      icon: Zap,
      avatar: "💡",
      color: "bg-gradient-to-br from-orange-700 to-orange-500",
      hoverColor: "hover:from-orange-600 hover:to-orange-400",
      iconColor: "text-orange-200",
    },
  ];

  const episodes = [
    {
      id: 1,
      title: "Hydro Harmony: Smart Irrigation & Fertilization",
      description:
        "Scopus-indexed research on ML-driven smart irrigation efficiency.",
      duration: "IET Conf. Proc. 2024",
      thumbnail: "/p2.png", // Replace with a relevant image for IoT/ML in agriculture
      progress: 100, // Represents a completed publication
      isWatched: true,
    },
    {
      id: 2,
      title: "Advanced Discretization Techniques for Groundwater",
      description:
        "Scopus-indexed study on numerical methods for groundwater modeling.",
      duration: "Scholar Articles 2025",
      thumbnail: "/p4.png", // Replace with an image for environmental modeling/data
      progress: 100, // Represents a completed publication
      isWatched: true,
    },
    {
      id: 3,
      title: "Environmental Modeling: Groundwater Flow",
      description:
        "Scopus-indexed paper on simulating groundwater flow & contaminant transport.",
      duration: "IET Conf. Proc. 2024",
      thumbnail: "/env.png", // Replace with an image for scientific research/simulations
      progress: 100, // Represents a completed publication
      isWatched: true,
    },
  ];

  const netflixOriginals = [
    {
      id: 1,
      title: "MUN Event Website (Technicia'25)",
      tagline: "Connecting Delegates, Streamlining Events",
      description:
        "Developed a full-stack SaaS platform for real-time AI-driven image editing and enhancement for the Technicia'25 MUN event at Chandigarh University. This project streamlined event management, user registration, and content delivery, ensuring a seamless experience for all participants.",
      image: "/mun.png?height=400&width=600", // You'll want to replace this with an actual image for MUN Event Website
      tech: [
        "Next.js",
        "MongoDB",
        "Google OAuth",
        "Tailwind CSS",
        "Authentication",
        "Event Management",
      ],
      github: "https://github.com/Jat21in/MUN-ISTE",
      live: "https://mun-iste.vercel.app/",
      rating: "88% Match",
      genre: "Event Management / Web Platform",
      year: "2025", // Assuming 2025 for Technicia'25
      duration: "Event Special",
    },
    {
      id: 2,
      title: "Imaginify: AI Image SaaS",
      tagline: "Your Vision, AI-Enhanced",
      description:
        "Imaginify is a full-fledged AI-powered image processing SaaS platform that enables users to perform sophisticated image transformations using cutting-edge AI techniques. It features secure user management, a credit-based image processing model, payment integration, and a responsive interface.",
      image: "/imaginify.png?height=400&width=600", // You'll want to replace this with an actual image for Imaginify
      tech: [
        "Next.js",
        "Clerk Authentication",
        "MongoDB",
        "Cloudinary API",
        "Stripe",
        "Tailwind CSS",
      ],
      github: "https://github.com/Jat21in/imaginify",
      live: "https://imaginify-mocha-two.vercel.app/",
      rating: "95% Match",
      genre: "SaaS / AI / E-commerce",
      year: "2024",
      duration: "1 Season", // Represents an ongoing or substantial project
    },
    {
      id: 3,
      title: "Gamified Admin Arena (NEXUS-COMMAND-CENTER)",
      tagline: "Level Up Your Productivity!",
      description:
        "Gamified Admin Arena is a vibrant, retro-themed admin dashboard built with React.js that transforms mundane admin operations into engaging gamified missions. Earn XP, level up, unlock badges, customize your avatar, and even switch to 8-bit Retro Mode for that nostalgic feel!",
      image: "/dashboard.png?height=400&width=600", // You'll want to replace this with an actual image for Gamified Admin Arena
      tech: [
        "React.js",
        "Tailwind CSS",
        "Gamification Concepts",
        "Frontend Development",
      ],
      github: "https://github.com/Jat21in/NEXUS-COMMAND-CENTER",
      live: "https://nexus-command-center.vercel.app/",
      rating: "90% Match",
      genre: "Productivity / UI/UX / Gamification",
      year: "2024",
      duration: "1h 30m Film", // Represents a focused project
    },
    {
      id: 4,
      title: "HydroHarmony: Smart Irrigation",
      tagline: "A Deep Learning Agricultural Saga",
      description:
        "HydroHarmony is a state-of-the-art system designed to revolutionize irrigation and fertilization management in agriculture through advanced machine learning techniques. It leverages Support Vector Machine (SVM) and Random Forest algorithms to optimize water and fertilizer distribution, ensuring precise decision-making that maximizes crop yield and minimizes resource waste.",
      image: "/p2.png?height=400&width=600", // You'll want to replace this with an actual image for HydroHarmony
      tech: [
        "Machine Learning",
        "SVM",
        "Random Forest",
        "Python",
        "Agricultural Tech",
      ],
      github: "https://github.com/Jat21in/HydroHarmonay",
      live: "https://www.scopus.com/pages/publications/105003540617", // Set to null since it's not live
      rating: "97% Match",
      genre: "Agricultural AI / Optimization",
      year: "2024", // Assuming completion in 2024
      duration: "Research Project",
    },
  ];

  const skills = [
    // Core Programming Languages
    {
      name: "JavaScript",
      level: 92,
      category: "Language",
      genre: "Dynamic Scripting",
    },
    {
      name: "Python",
      level: 88,
      category: "Language",
      genre: "Data Science Drama",
    },
    { name: "Java", level: 80, category: "Language", genre: "Enterprise Saga" },

    // Frontend & UI
    {
      name: "React.js",
      level: 93,
      category: "Frontend",
      genre: "Component Comedy",
    },
    {
      name: "Next.js",
      level: 95,
      category: "Framework",
      genre: "Server-Side Epic",
    },
    {
      name: "Tailwind CSS",
      level: 88,
      category: "Frontend",
      genre: "Utility Styles",
    },

    // Backend & APIs
    {
      name: "Node.js",
      level: 87,
      category: "Backend",
      genre: "Runtime Thriller",
    },

    // Databases
    { name: "MySQL", level: 78, category: "Database", genre: "SQL Stories" },

    // Cloud & DevOps

    // Key Concepts & Methodologies
    {
      name: "DSA",
      level: 88,
      category: "Concepts",
      genre: "Algorithm Analytics",
    },
    {
      name: "System Design",
      level: 75,
      category: "Concepts",
      genre: "Architectural Blueprints",
    },
  ];

  const handleProfileSelect = (profileId: UserProfile) => {
  if (audioRefProfileClick.current) {
    audioRefProfileClick.current.volume = 0.8;
    audioRefProfileClick.current.play().catch(console.error);
  }

  setTimeout(() => {
    setSelectedProfile(profileId);
    setCurrentScreen("main");
  }, 700); // Delay to allow sound to play before transition
};


  const skipIntro = () => {
    setShowSkipIntro(false);
    setWatchProgress(15);
  };

  // Splash Screen
  if (currentScreen === "splash") {
    return (
      <div
        className={`min-h-screen bg-black flex items-center justify-center overflow-hidden transition-all duration-1500 ${
          transitionPhase === "fadeOut"
            ? "opacity-0 scale-110"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Netflix Sound Effect */}
        <audio ref={audioRef} preload="auto">
          <source src="/Netflix-intro.mp3" type="audio/mp3" />
        </audio>

        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
        <div className="relative z-10 text-center">
          <div
            className={`splash-animation ${
              isTransitioning ? "transitioning" : ""
            }`}
          >
            <h1 className="text-8xl md:text-9xl font-bold netflix-title mb-4">
              JATIN
              <br />
              <span className="text-red-500">MITTAL</span>
            </h1>
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  

  // Profile Selection Screen
  if (currentScreen === "profiles") {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden animate-fadeInUp">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="floating-shapes">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`floating-shape shape-${i % 4}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 netflix-title">
              Who's Watching?
            </h1>
            <p className="text-xl text-gray-400">
              Select your viewing experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl">
            {profiles.map((profile) => {
              const IconComponent = profile.icon;
              return (
                <div
                  key={profile.id}
                  className="profile-card cursor-pointer group"
                  onClick={() => handleProfileSelect(profile.id)}
                >
                  <div
                    className={`w-32 h-32 md:w-40 md:h-40 ${profile.color} ${profile.hoverColor} rounded-lg flex flex-col items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl relative overflow-hidden`}
                  >
                    {/* Avatar Emoji */}
                    <div className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">
                      {profile.avatar}
                    </div>
                    {/* Icon */}
                    <IconComponent
                      className={`w-8 h-8 md:w-10 md:h-10 ${profile.iconColor} opacity-80`}
                    />

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {profile.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 bg-transparent"
              onClick={() => setShowManageProfiles(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Manage Profiles
            </Button>
          </div>

          {/* Manage Profiles Modal */}
          {showManageProfiles && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Manage Profiles
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowManageProfiles(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {profiles.map((profile) => {
                    const IconComponent = profile.icon;
                    return (
                      <div key={profile.id} className="text-center group">
                        <div
                          className={`w-20 h-20 ${profile.color} rounded-lg flex flex-col items-center justify-center mb-2 group-hover:opacity-80 transition-opacity`}
                        >
                          <span className="text-2xl mb-1">
                            {profile.avatar}
                          </span>
                          <IconComponent
                            className={`w-4 h-4 ${profile.iconColor}`}
                          />
                        </div>
                        <p className="text-sm text-gray-300">{profile.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 hover:text-red-500 mt-1"
                        >
                          Edit
                        </Button>
                      </div>
                    );
                  })}
                  <div className="text-center">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-2 hover:border-red-500 transition-colors cursor-pointer">
                      <Plus className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-400">Add Profile</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowManageProfiles(false)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const episodesToDisplay: Episode[] = allEpisodes[currentSeason] || [];

  // Main Application (rest of your existing code remains the same)
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Matrix Rain Effect */}
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <span
                  key={j}
                  className="matrix-char"
                  style={{
                    animationDelay: `${j * 0.1}s`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="floating-shapes">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`floating-shape shape-${i % 4}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="glowing-orbs">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="glowing-orb"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 12}s`,
              }}
            />
          ))}
        </div>

        {/* Code Streams */}
        <div className="code-streams">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="code-stream"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div className="code-text">{`function develop() { return 'amazing'; }`}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-red-500">
              PORT<span className="text-white">FLIX</span>
            </div>
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#home" className="hover:text-gray-300 transition-colors">
                Home
              </a>
              <a
                href="#series"
                className="hover:text-gray-300 transition-colors"
              >
                My Series
              </a>
              <a
                href="#originals"
                className="hover:text-gray-300 transition-colors"
              >
                Originals
              </a>
              <a
                href="#skills"
                className="hover:text-gray-300 transition-colors"
              >
                Genres
              </a>
              <a
                href="#achievements"
                className="hover:text-gray-300 transition-colors"
              >
                Accomplishments
              </a>
              <a
                href="#contact"
                className="hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-500"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div
              className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-red-700 transition-colors"
              onClick={() => setCurrentScreen("profiles")}
            >
              {selectedProfile ? selectedProfile.charAt(0).toUpperCase() : "AJ"}
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section with Video Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Video Background Simulation */}
        <div className="absolute inset-0 z-0">
          <div className="video-background">
            <div className="video-overlay"></div>
            <div className="video-content">
              <div className="floating-code-blocks">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="code-block"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  >
                    {
                      [
                        "React",
                        "Node.js",
                        "TypeScript",
                        "Python",
                        "AWS",
                        "Docker",
                        "Next.js",
                        "Express.js",
                        "GraphQL",
                        "MongoDB",
                        "PostgreSQL",
                        "MySQL",
                        "Redux",
                        "Tailwind CSS",
                        "Sass",
                        "Kubernetes",
                        "Terraform",
                        "Firebase",
                        "Jenkins",
                        "Git",
                        "GitHub Actions",
                        "Nginx",
                        "Linux",
                        "Webpack",
                        "Jest",
                        "Cypress",
                        "Socket.io",
                        "REST API",
                        "OpenAI API",
                        "Elasticsearch",
                        "Redis",
                      ][Math.floor(Math.random() * 6)]
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="mb-4">
              <Badge className="bg-red-600 text-white mb-2">
                <Star className="h-3 w-3 mr-1" />
                JATIN ORIGINAL SERIES
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 netflix-title">
              CODE
              <br />
              <span className="text-red-500">CHRONICLES</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-lg">
              Follow the epic journey of Jatin Mittal, a graduate developer who
              transforms from coding novice to full-stack master in this
              thrilling three-season saga.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-semibold"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Play className="mr-2 h-5 w-5" />
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-white hover:border-white bg-gray-800/50 backdrop-blur-sm px-8 py-3"
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </div>
            {/* Netflix-style controls */}
            {isPlaying && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-red-500"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-red-500"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-red-500"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Skip Intro Button */}
        {showSkipIntro && isPlaying && (
          <div className="absolute bottom-20 right-8 z-30">
            <Button
              onClick={skipIntro}
              className="bg-gray-800/80 hover:bg-gray-700 text-white border border-gray-600"
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Skip Intro
            </Button>
          </div>
        )}
        {/* Progress Bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <Progress value={watchProgress} className="h-1 bg-gray-800" />
          </div>
        )}
      </section>
      {/* Continue Watching */}
      {showContinueWatching && (
        <section className="py-8 bg-black relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Continue Watching for{" "}
              {selectedProfile
                ? profiles.find((p) => p.id === selectedProfile)?.name
                : "Jatin"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {episodes.slice(0, 3).map((episode) => (
                <Card
                  key={episode.id}
                  className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer group"
                >
                  <div className="relative">
                    <Image
                      src={episode.thumbnail || "/placeholder.svg"}
                      alt={episode.title}
                      width={350}
                      height={200}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    {episode.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <Progress value={episode.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-1">
                      {episode.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {episode.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{episode.duration}</span>
                      {episode.isWatched && (
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500"
                        >
                          Watched
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Netflix Originals - Projects */}
      <section id="originals" className="py-12 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Netflix Originals
          </h2>
          <div className="space-y-12">
            {netflixOriginals.map((project, index) => (
              <div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className={`relative group ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className={`w-full h-80 object-cover transition-transform duration-500 ${
                        hoveredProject === project.id
                          ? "scale-110"
                          : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-red-600 text-white text-xs">
                          {project.rating}
                        </Badge>
                        <span className="text-xs text-gray-300">
                          {project.year}
                        </span>
                        <span className="text-xs text-gray-300">
                          {project.duration}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-500 text-gray-300"
                        >
                          {project.genre}
                        </Badge>
                      </div>
                    </div>
                    {hoveredProject === project.id && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="bg-white text-black hover:bg-gray-200">
                                <Play className="h-4 w-4 mr-2" />
                                Live Demo
                              </Button>
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                              >
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`space-y-4 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div>
                    <Badge className="bg-red-600 text-white mb-2">
                      <Star className="h-3 w-3 mr-1" />
                      {project.tagline}
                    </Badge>
                  </div>
                  <h3 className="text-4xl font-bold text-white netflix-title">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-red-500/30 text-red-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-4 pt-4">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch Now
                        </Button>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="border-gray-500 text-white hover:border-white bg-transparent"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills - Genres Section */}
      <section
        id="skills"
        className="py-20 px-4 md:px-8 relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent"
      >
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-white netflix-title animate-fadeInUp">
            My Skillset: The Tech Library
          </h2>

          {/* Category Selection - Keep this section if you want the category filtering */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h3 className="text-3xl font-bold text-red-500 mb-6">
              Top Genres (My Skills)
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {/* "All Genres" button (adjust 'selectedSkillCategory' state and logic as per your previous implementation) */}
              {/* <Button
          variant={selectedSkillCategory === null ? "default" : "outline"}
          className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
            selectedSkillCategory === null
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
              : "border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 bg-transparent"
          }`}
          onClick={() => setSelectedSkillCategory(null)}
        >
          All Genres
        </Button>
        {skillCategories.map((category) => (
          <Button
            key={category}
            variant={selectedSkillCategory === category ? "default" : "outline"}
            className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
              selectedSkillCategory === category
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                : "border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 bg-transparent"
            }`}
            onClick={() => setSelectedSkillCategory(category)}
          >
            {category}
          </Button>
        ))} */}
            </div>
          </div>
          {/* End Category Selection */}

          {/* Display Skills */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className="
            relative group overflow-hidden
            bg-gray-900 border border-gray-800 rounded-xl
            flex flex-col items-center justify-center p-6 text-center
            transform transition-all duration-500 ease-out
            hover:scale-105 hover:shadow-2xl
            animate-slideInUp
          "
                style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
              >
                {/* Animated Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-red-500 group-hover:text-red-400 transition-colors duration-300 mb-3 transform group-hover:scale-110">
                    {skill.category === "Frontend" && (
                      <Code className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {skill.category === "Backend" && (
                      <Database className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {skill.category === "Language" && (
                      <Brain className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {skill.category === "Database" && (
                      <span className="text-4xl drop-shadow-lg">🗄️</span>
                    )}
                    {skill.category === "Cloud" && (
                      <Award className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {skill.category === "DevOps" && (
                      <Zap className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {skill.category === "Framework" && (
                      <Coffee className="h-10 w-10 drop-shadow-lg" />
                    )}
                    {/* You might want to add icons for other categories like "AI/ML", "Concepts", "Tools", "Specialization" if they are in your skills array */}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 transform group-hover:text-red-300 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-red-600 text-red-300 bg-red-900/20 px-3 py-1 text-xs font-medium backdrop-blur-sm
                         transition-all duration-300 group-hover:bg-red-800/50 group-hover:scale-105"
                  >
                    {skill.genre}
                  </Badge>
                  <Progress
                    value={skill.level}
                    className="mt-4 w-full h-2 bg-gray-700 rounded-full [&>*]:bg-red-600"
                  />
                  <p className="text-sm text-gray-400 mt-2 font-medium">
                    {skill.level}% Expertise
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Season Breakdown */}
      <section id="series" className="py-12 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Code Chronicles: Season Breakdown
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {seasons.map(
              (
                season: Season // Explicitly type 'season' parameter
              ) => (
                <Card
                  key={season.number}
                  className={`bg-gray-900 border-gray-800 ${
                    currentSeason === season.number
                      ? "border-red-600 shadow-lg"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        Season {season.number}
                      </h3>
                      <Badge className="bg-gray-700 text-gray-300">
                        {season.year}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">{season.title}</p>
                    <p className="text-gray-400 text-sm mb-4">
                      {season.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">
                        {season.episodesCount} Episodes
                      </span>
                      <Button
                        variant={
                          currentSeason === season.number
                            ? "default"
                            : "outline"
                        }
                        className={
                          currentSeason === season.number
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "border-gray-600 text-gray-400 hover:border-white hover:text-black bg-transparent"
                        }
                        onClick={() => setCurrentSeason(season.number)}
                      >
                        {currentSeason === season.number
                          ? "Watching"
                          : "Binge Watch"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Episodes from Season {currentSeason}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {episodesToDisplay.length > 0 ? ( // Check if there are episodes to display
                episodesToDisplay.map(
                  (
                    episode: Episode // Explicitly type 'episode' parameter
                  ) => (
                    <Card
                      key={episode.id}
                      className="bg-gray-900 border-gray-800 flex flex-col md:flex-row items-start md:items-center p-4 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <div className="relative w-full md:w-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <Image
                          src={episode.thumbnail || "/placeholder.svg"}
                          alt={episode.title}
                          width={350}
                          height={200}
                          className="w-full h-28 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                          <Play className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-white text-lg mb-1">
                          E{episode.id}: {episode.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          {episode.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{episode.duration}</span>
                          {episode.isWatched && (
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-500"
                            >
                              Watched
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                )
              ) : (
                <p className="text-gray-400">
                  No episodes available for this season yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Achievements */}
      <section id="achievements" className="py-20 px-4 md:px-8 relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
  <div className="container mx-auto">
    <h2 className="text-5xl font-bold text-center mb-16 text-white netflix-title animate-fadeInUp">
      My Accolade Collection
    </h2>

    {/* Category Selection - Keep this section if you want the category filtering */}
    <div className="text-center mb-12 animate-fadeInUp">
  <p className="text-lg text-gray-300 mb-6 mx-auto max-w-3xl">
    Explore my significant achievements, certifications, and project milestones.
  </p>
</div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {achievements.map((achievement: AchievementItem) => (
        <Card
          key={achievement.id}
          // The 'group' class is essential for group-hover effects on children
          className="bg-gray-900 border-gray-800 overflow-hidden group relative cursor-pointer
                     transition-all duration-300 transform
                     hover:scale-105
                     hover:border-red-600                       /* New: Border lights up red */
                     hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] /* New: Red glowing shadow */
                     hover:bg-gray-800                          /* New: Slightly lighter background */
                    "
        >
          <div className="relative w-full h-48">
            <Image
              src={achievement.imageSrc}
              alt={achievement.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md transition-transform duration-300 group-hover:scale-110" // Image scales slightly on hover
            />
            {/* Overlay for event name on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
              <h3 className="text-xl font-semibold text-white">
                {achievement.name}
              </h3>
            </div>
          </div>
          {/* CardContent is removed as per the requirement to show name ONLY on hover over image */}
        </Card>
      ))}
    </div>
  </div>
</section>
      {/* Call to Action / Contact */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-t from-black to-gray-900 relative z-10"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white netflix-title">
            Ready for Your Next Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a recruiter seeking a dedicated developer, a fellow
            enthusiast for collaboration, or just curious about my work, I'm
            always open to new connections.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Email Button */}
            <a
              href="mailto:mittaljatin2004@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </Button>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/jatinmittal08/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-white hover:border-white bg-gray-800/50 backdrop-blur-sm px-8 py-3"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/Jat21in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-white hover:border-white bg-gray-800/50 backdrop-blur-sm px-8 py-3"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black py-8 text-gray-500 text-center text-sm relative z-10">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Jatin Mittal. All rights reserved.
            Netflix-inspired portfolio.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </footer>
      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .netflix-title {
          font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        /* Splash Screen Animations */
        .splash-animation {
          opacity: 0;
          animation: fadeInScale 2s ease-out forwards;
        }

        .splash-animation.transitioning {
          animation: fadeOutScale 1s ease-in forwards;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOutScale {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
          }
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .dot {
          width: 12px;
          height: 12px;
          background-color: #e50914;
          border-radius: 50%;
          margin: 0 8px;
          opacity: 0;
          animation: dotFade 1.5s infinite ease-in-out;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.5s;
        }
        .dot:nth-child(3) {
          animation-delay: 1s;
        }

        @keyframes dotFade {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Profile Selection Screen Animations */
        .profile-card {
          position: relative;
          transition: all 0.3s ease-in-out;
          transform-style: preserve-3d;
        }

        .profile-card:hover .profile-image-container {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(229, 9, 20, 0.6);
        }

        .profile-card .profile-image-container {
          transition: all 0.3s ease-in-out;
        }

        /* Floating Shapes for Backgrounds */
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          perspective: 1000px;
        }

        .floating-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          animation: floatAndRotate linear infinite;
          opacity: 0.1;
          filter: blur(2px);
        }

        .floating-shape:nth-child(4n + 1) {
          width: 80px;
          height: 80px;
          background: rgba(229, 9, 20, 0.1);
        }

        .floating-shape:nth-child(4n + 2) {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background: rgba(0, 255, 0, 0.05);
          transform: rotate(45deg);
        }

        .floating-shape:nth-child(4n + 3) {
          width: 100px;
          height: 100px;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          background: rgba(255, 255, 0, 0.05);
        }

        .floating-shape:nth-child(4n) {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(0, 0, 255, 0.05);
        }

        @keyframes floatAndRotate {
          0% {
            transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translate(10vw, 5vh) rotateY(90deg) rotateX(45deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(0, 10vh) rotateY(180deg) rotateX(90deg);
            opacity: 0.1;
          }
          75% {
            transform: translate(-10vw, 5vh) rotateY(270deg) rotateX(45deg);
            opacity: 0.2;
          }
          100% {
            transform: translate(0, 0) rotateY(360deg) rotateX(0deg);
            opacity: 0.1;
          }
        }

        /* Video Background Simulation */
        .video-background {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.5) 20%,
            transparent 50%,
            transparent 80%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 1;
        }

        .video-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .floating-code-blocks {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .code-block {
          position: absolute;
          background: rgba(229, 9, 20, 0.1);
          color: rgba(255, 255, 255, 0.8);
          font-family: monospace;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 3px;
          opacity: 0;
          animation: floatCode 15s infinite ease-in-out forwards;
          white-space: nowrap;
          transform: translateZ(0);
        }

        @keyframes floatCode {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translate(15vw, 20vh) scale(1.1) rotate(5deg);
            opacity: 0.6;
          }
          50% {
            transform: translate(30vw, 40vh) scale(1.2) rotate(-5deg);
            opacity: 0.8;
          }
          75% {
            transform: translate(45vw, 60vh) scale(1.1) rotate(5deg);
            opacity: 0.6;
          }
          100% {
            transform: translate(60vw, 80vh) scale(1) rotate(0deg);
            opacity: 0;
          }
        }

        /* Matrix Rain Effect */
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          opacity: 0.1;
          pointer-events: none;
        }

        .matrix-column {
          position: absolute;
          top: 0;
          width: 20px;
          height: 100%;
          animation: rainDrop linear infinite;
        }

        .matrix-char {
          display: block;
          color: #0f0;
          font-family: "Roboto Mono", monospace;
          font-size: 16px;
          line-height: 1.2;
          opacity: 0;
          animation: charFade 1s linear forwards;
        }

        @keyframes rainDrop {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes charFade {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* Glowing Orbs */
        .glowing-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          filter: blur(10px);
        }

        .glowing-orb {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(
            circle,
            rgba(229, 9, 20, 0.5) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: orbMovement linear infinite alternate;
          opacity: 0.3;
        }

        .glowing-orb:nth-child(2n) {
          background: radial-gradient(
            circle,
            rgba(0, 119, 181, 0.5) 0%,
            transparent 70%
          );
        }

        @keyframes orbMovement {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(15vw, 10vh) scale(1.2);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        /* Code Streams */
        .code-streams {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .code-stream {
          position: absolute;
          top: 0;
          height: 20px;
          line-height: 20px;
          opacity: 0.05;
          white-space: nowrap;
          animation: streamFlow linear infinite;
        }

        .code-text {
          color: #eee;
          font-family: "Roboto Mono", monospace;
          font-size: 14px;
        }

        @keyframes streamFlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Smooth Transition Animations */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .duration-1500 {
          transition-duration: 1500ms;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out forwards;
        }

        /* Enhanced splash transition */
        .splash-animation.transitioning {
          animation: splashTransitionOut 1.5s ease-in forwards;
        }

        @keyframes splashTransitionOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        /* Netflix-style profile entrance */
        .profile-card {
          position: relative;
          transition: all 0.3s ease-in-out;
          transform-style: preserve-3d;
          animation: profileSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .profile-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .profile-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .profile-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .profile-card:nth-child(4) {
          animation-delay: 0.4s;
        }

        @keyframes profileSlideIn {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
