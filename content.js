// All page content lives here. Edit this file to update the site.
// status: "live" = demo is running, "soon" = demo being prepared, "none" = no public demo possible
window.SITE = {
  person: {
    name: { vi: "Nguyễn Thái Dương", en: "Nguyen Thai Duong" },
    role: {
      vi: "Kỹ sư phần mềm · Backend Java/.NET · AI",
      en: "Software engineer · Backend Java/.NET · AI"
    },
    intro: {
      vi: "Mình xây backend bằng Java (Spring Boot) và .NET, và làm các tính năng dùng mô hình ngôn ngữ lớn. Mới tốt nghiệp Kỹ thuật phần mềm (chuyên ngành AI) tại Đại học FPT, đang tìm vị trí junior Backend Java, AI Engineer hoặc Data Engineer tại TP. Hồ Chí Minh.",
      en: "I build backend services in Java (Spring Boot) and .NET, and features powered by large language models. I recently graduated in Software Engineering (AI specialization) from FPT University and I'm looking for a junior Backend Java, AI Engineer or Data Engineer role in Ho Chi Minh City."
    },
    location: { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
    email: "duongnguyencv1424@gmail.com",
    phone: "0358 858 617",
    github: "https://github.com/DuongNT1424",
    huggingface: "https://huggingface.co/DuongNTCE",
    photo: "assets/duong.jpg",
    cv: { vi: "assets/CV_NguyenThaiDuong_VI.pdf", en: "assets/CV_NguyenThaiDuong_EN.pdf" }
  },

  projects: [
    {
      id: "devprep",
      name: "DevPrep",
      tagline: { vi: "Nền tảng phỏng vấn thử bằng AI", en: "AI mock-interview platform" },
      context: {
        vi: "Đồ án tốt nghiệp, Đại học FPT · Trưởng nhóm, nhóm 6 người · 05–08/2026",
        en: "Capstone project, FPT University · Team leader, team of 6 · May–Aug 2026"
      },
      stack: [".NET 8", "YARP", "Python", "SQL Server", "Docker", "QLoRA"],
      status: "ui",
      demo: "devprep/",
      demoLabel: { vi: "Demo ứng viên", en: "Candidate demo" },
      demoAdmin: "devprep/admin/",
      demoNote: {
        vi: "Bản demo giao diện với dữ liệu mẫu, đủ 3 vai trò: ứng viên (phỏng vấn thử với AI, báo cáo, phân tích CV–JD), Admin và Manager. Có thêm video demo toàn bộ luồng.",
        en: "UI demo with sample data covering all three roles: candidate (AI mock interview, report, CV–JD analysis), admin and manager. A full walkthrough video is included."
      },
      video: {
        view: "https://drive.google.com/file/d/1QXv3oB12b5_Utb4H8kIim9D806Wrsh0k/view?usp=sharing",
        embed: "https://drive.google.com/file/d/1QXv3oB12b5_Utb4H8kIim9D806Wrsh0k/preview"
      },
      code: "https://github.com/DuongNT1424/DevPrep",
      extra: { label: { vi: "Model CV parser", en: "CV parser model" }, url: "https://huggingface.co/DuongNTCE/devprep-cv-parser" },
      points: {
        vi: [
          "Điều phối nhóm 6 người theo Scrum qua 4 sprint; đồ án đạt 8.0/10.",
          "Fine-tune Gemma-2-2B-it bằng QLoRA thành model trích xuất CV và mô tả công việc ra JSON có cấu trúc.",
          "Xây dựng so khớp CV–JD: điểm 0–100 (60% kỹ năng bắt buộc, 25% điểm mạnh, 15% kỹ năng ưu tiên) kèm gợi ý kỹ năng còn thiếu.",
          "Xây dựng Payment service tích hợp VNPay: tạo đơn, xử lý Return/IPN callback, lịch sử giao dịch, gói credit.",
          "Đảm nhận phần kiểm thử nhiều nhất nhóm (21%); 1.253 unit test và 485 system test case đều đạt."
        ],
        en: [
          "Led a 6-member Scrum team through 4 sprints; the capstone was graded 8.0/10.",
          "Fine-tuned Gemma-2-2B-it with QLoRA into a parser that turns CVs and job descriptions into structured JSON.",
          "Built CV–JD matching: a 0–100 score (60% required skills, 25% strengths, 15% nice-to-have) with missing-skill suggestions.",
          "Built the Payment service with VNPay: order creation, Return/IPN callbacks, transaction history, credit packages.",
          "Took the largest share of team testing (21%); shipped with 1,253 unit tests and 485 system test cases passing."
        ]
      }
    },
    {
      id: "booknest",
      name: "BookNest",
      tagline: { vi: "Website bán sách trực tuyến", en: "Online bookstore" },
      context: {
        vi: "Môn SWP391 · Nhóm 3 người · 03–04/2026",
        en: "SWP391 Software Development Project · Team of 3 · Mar–Apr 2026"
      },
      stack: ["Java 17", "Spring Boot", "Spring Data JPA", "Thymeleaf", "SQL Server"],
      status: "ui",
      demo: "booknest/index.html",
      demoLabel: { vi: "Demo cửa hàng", en: "Store demo" },
      demoAdmin: "booknest/admin/index.html",
      demoNote: {
        vi: "Bản demo giao diện với dữ liệu mẫu: xem được cả trang cửa hàng lẫn trang quản trị, các thao tác lưu đã được tắt.",
        en: "UI demo with sample data: browse both the store and the admin panel. Saving is turned off."
      },
      code: "https://github.com/DuongNT1424/Bookstore",
      points: {
        vi: [
          "Xây dựng trang quản trị: dashboard doanh thu, quản lý sách, danh mục, người dùng, đơn hàng và voucher.",
          "Xây dựng giỏ hàng, thanh toán và luồng trạng thái đơn hàng: trừ kho khi xác nhận, hoàn kho khi hủy."
        ],
        en: [
          "Built the admin back office: revenue dashboard and management of books, categories, users, orders and vouchers.",
          "Implemented cart, checkout and the order-status flow that deducts stock on confirmation and restores it on cancellation."
        ]
      }
    },
    {
      id: "vida",
      name: "ViDa Bioleather",
      tagline: { vi: "Website thương mại điện tử", en: "E-commerce website" },
      context: {
        vi: "Môn EXE101 & EXE201 Khởi nghiệp · CTO, lập trình viên duy nhất trong nhóm 5 người · 10/2025–02/2026",
        en: "EXE101 & EXE201 Entrepreneurship · CTO, sole developer in a team of 5 · Oct 2025–Feb 2026"
      },
      stack: ["Next.js", "MongoDB", "JWT", "Vercel"],
      status: "live",
      demo: "https://vida-bioleather.vercel.app/",
      code: "https://github.com/DuongNT1424/vida-bioleather",
      points: {
        vi: [
          "Làm v1 (React, TypeScript, Express), rồi xây lại trên Next.js với xác thực JWT (httpOnly cookie, bcrypt) và phân quyền.",
          "Hoàn thiện giỏ hàng, thanh toán, quy trình đơn hàng, đánh giá cho người đã mua và mã QR kiểm tra hàng chính hãng."
        ],
        en: [
          "Built v1 (React, TypeScript, Express), then rebuilt it on Next.js with JWT auth (httpOnly cookies, bcrypt) and role-based access.",
          "Delivered cart, checkout, order workflow, verified-purchase reviews and QR-based product authenticity checks."
        ]
      }
    },
    {
      id: "biopest",
      name: "BioPestControl",
      tagline: { vi: "Ứng dụng di động cho cửa hàng vật tư nông nghiệp", en: "Mobile app for an agricultural supply store" },
      context: {
        vi: "Môn PRM393 Mobile Programming · Nhóm 5 người · 05–07/2026",
        en: "PRM393 Mobile Programming · Team of 5 · May–Jul 2026"
      },
      stack: ["Flutter", "BLoC", "Firebase", "Firestore", "OpenStreetMap"],
      status: "soon",
      demo: null,
      demoNote: {
        vi: "Đang làm bản chạy trên trình duyệt.",
        en: "A browser version is in progress."
      },
      code: "https://github.com/DuongNT1424/PRM393_BioPestControl",
      points: {
        vi: [
          "Xây dựng chat thời gian thực bằng Firestore, quản lý an toàn hóa chất và bản đồ cửa hàng có chỉ đường (OpenStreetMap, OSRM)."
        ],
        en: [
          "Built real-time chat on Firestore listeners, chemical safety management, and a store map with routing (OpenStreetMap, OSRM)."
        ]
      }
    }
  ],

  experience: [
    {
      org: "BRB Software",
      url: "https://brightbrain.vn",
      role: { vi: "Thực tập sinh Backend", en: "Backend Developer Intern" },
      time: { vi: "05/2025 – 08/2025", en: "May 2025 – Aug 2025" },
      stack: [".NET", "SQL Server"],
      points: {
        vi: [
          "Phát triển module tạo và xuất hóa đơn cho hệ thống bán vé tàu của khách hàng bên thứ ba.",
          "Xây dựng logic backend chuyển giao dịch vé đã thanh toán thành hóa đơn và xuất ra phục vụ quy trình thanh toán của khách hàng."
        ],
        en: [
          "Developed the invoice generation and export module of a ferry ticketing system built for a third-party client.",
          "Built backend logic that turns paid ticket transactions into invoices and exports them for the client's payment workflow."
        ]
      }
    }
  ],

  education: {
    school: { vi: "Đại học FPT, cơ sở Cần Thơ", en: "FPT University, Can Tho Campus" },
    major: { vi: "Kỹ thuật phần mềm, chuyên ngành Trí tuệ nhân tạo", en: "Software Engineering, AI specialization" },
    time: "2022 – 2026",
    note: { vi: "Đồ án tốt nghiệp: 8.0/10", en: "Capstone project: 8.0/10" }
  },

  skills: [
    { group: { vi: "Ngôn ngữ lập trình", en: "Languages" }, items: ["Java", "C#", "Python", "SQL", "JavaScript/TypeScript", "Dart"] },
    { group: { vi: "Backend", en: "Backend" }, items: ["Spring Boot", "Spring Data JPA", "ASP.NET Core", "Entity Framework Core", "REST API", "Microservices", "YARP"] },
    { group: { vi: "AI / ML", en: "AI / ML" }, items: ["Hugging Face Transformers", "LoRA/QLoRA", "RAG", "ChromaDB", "Gemini API"] },
    { group: { vi: "Dữ liệu & công cụ", en: "Data & tools" }, items: ["SQL Server", "MongoDB", "SQLite", "Firestore", "Docker", "Docker Compose", "Git", "Maven"] }
  ],

  certificates: [
    { name: "Python for Everybody", by: "University of Michigan · Coursera" },
    { name: "Certified Ethical Emerging Technologist", by: "CertNexus · Coursera" },
    { name: "Software Development Lifecycle", by: "University of Minnesota · Coursera" },
    { name: "Project Management Principles and Practices", by: "UC Irvine · Coursera" }
  ],

  ui: {
    nav: { vi: ["Dự án", "Kinh nghiệm", "Kỹ năng", "Liên hệ"], en: ["Projects", "Experience", "Skills", "Contact"] },
    projectsTitle: { vi: "Dự án", en: "Projects" },
    projectsLead: {
      vi: "Bấm “Mở demo” để dùng thử ngay trên trình duyệt. Chấm xanh lá là bản đang chạy thật, chấm xanh dương là bản demo giao diện với dữ liệu mẫu.",
      en: "Press “Open demo” to try a project right in your browser. A green marker means the app is live; a blue one means a UI demo with sample data."
    },
    statusLive: { vi: "Đang chạy", en: "Running" },
    statusSoon: { vi: "Đang chuẩn bị demo", en: "Demo in preparation" },
    statusUi: { vi: "Demo giao diện", en: "UI demo" },
    openDemo: { vi: "Mở demo", en: "Open demo" },
    adminDemo: { vi: "Demo trang quản trị", en: "Admin demo" },
    watchVideo: { vi: "Xem video demo", en: "Watch demo video" },
    hideVideo: { vi: "Đóng video", en: "Close video" },
    videoNewTab: { vi: "Mở video trên Google Drive", en: "Open the video on Google Drive" },
    viewCode: { vi: "Xem mã nguồn", en: "View code" },
    details: { vi: "Chi tiết", en: "Details" },
    hideDetails: { vi: "Thu gọn", en: "Hide details" },
    expTitle: { vi: "Kinh nghiệm", en: "Experience" },
    eduTitle: { vi: "Học vấn", en: "Education" },
    skillsTitle: { vi: "Kỹ năng", en: "Skills" },
    certTitle: { vi: "Chứng chỉ", en: "Certificates" },
    contactTitle: { vi: "Liên hệ", en: "Contact" },
    contactLead: {
      vi: "Mình đang tìm việc và có thể bắt đầu ngay. Gửi email hoặc gọi trực tiếp cho mình.",
      en: "I'm looking for work and can start right away. Email me or call directly."
    },
    downloadCv: { vi: "Tải CV (PDF)", en: "Download CV (PDF)" },
    emailMe: { vi: "Gửi email", en: "Email me" },
    langSwitch: { vi: "English", en: "Tiếng Việt" },
    footer: { vi: "Trang này được cập nhật cùng CV.", en: "This page is kept in sync with my CV." }
  }
};
