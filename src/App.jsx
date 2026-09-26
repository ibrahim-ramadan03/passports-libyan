import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    ChevronDown,
    Clock3,
    FileCheck2,
    FileImage,
    FileText,
    Fingerprint,
    Globe2,
    Headphones,
    Info,
    Landmark,
    LockKeyhole,
    MapPin,
    Menu,
    Moon,
    Phone,
    Search,
    ShieldCheck,
    Sparkles,
    Sun,
    Upload,
    UserRound,
    Users,
    X,
} from "lucide-react";
import "./index.css";

const branches = [
    {
        id: 1,
        name: "فرع جوازات أبو سليم",
        city: "طرابلس",
        address: "طريق أبو سليم",
        appointments: ["09:00", "09:30", "10:00", "10:30", "11:00"],
    },
    {
        id: 2,
        name: "فرع جوازات السراج",
        city: "طرابلس",
        address: "الطريق الدائري الثاني",
        appointments: ["09:00", "10:00", "10:30", "11:30", "12:00"],
    },
    {
        id: 3,
        name: "فرع جوازات عين زارة",
        city: "طرابلس",
        address: "طريق عين زارة",
        appointments: ["09:00", "09:30", "10:30", "11:00", "12:00"],
    },
    {
        id: 4,
        name: "مكتب جوازات النفط",
        city: "طرابلس",
        address: "شارع الجمهورية",
        appointments: ["10:00", "10:30", "11:00", "11:30", "12:00"],
    },
];

const services = [
    {
        icon: FileCheck2,
        title: "إصدار جواز جديد",
        text: "ابدأ طلبك ونظم مستنداتك واحجز موعدك بسهولة.",
    },
    {
        icon: ArrowLeft,
        title: "تجديد جواز السفر",
        text: "تقديم طلب تجديد ومراجعة بياناتك قبل الموعد.",
    },
    {
        icon: FileText,
        title: "بدل فاقد",
        text: "مسار خاص لطلبات الجوازات المفقودة مع التنبيهات المطلوبة.",
    },
    {
        icon: ShieldCheck,
        title: "بدل تالف",
        text: "تجهيز طلب استبدال وثيقة السفر التالفة.",
    },
];

const documents = [
    {
        id: "oldPassport",
        title: "صورة الجواز السابق",
        description: "إذا كان لديك جواز سابق.",
        required: false,
    },
    {
        id: "workLetter",
        title: "رسالة جهة العمل",
        description: "أو إفادة من القوة العاملة حسب الحالة.",
        required: true,
    },
    {
        id: "idCard",
        title: "البطاقة الشخصية أو كتيب العائلة",
        description: "صورة واضحة للوثيقة.",
        required: true,
    },
    {
        id: "birthCertificate",
        title: "شهادة الميلاد",
        description: "شهادة ميلاد حديثة وواضحة.",
        required: true,
    },
    {
        id: "familyStatus",
        title: "شهادة الوضع العائلي",
        description: "صورة واضحة من المستند.",
        required: true,
    },
    {
        id: "residence",
        title: "شهادة الإقامة",
        description: "شهادة إقامة سارية.",
        required: true,
    },
    {
        id: "personalPhoto",
        title: "الصور الشخصية",
        description: "صورتان شخصيتان حديثتان وواضحتان.",
        required: true,
        multiple: true,
    },
];

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [showBooking, setShowBooking] = useState(false);
    const [showTrack, setShowTrack] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [toast, setToast] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingResult, setTrackingResult] = useState(null);
    const [service, setService] = useState("إصدار جواز جديد");
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState({});
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        fatherName: "",
        grandfatherName: "",
        familyName: "",
        nationalNumber: "",
        phone: "",
        email: "",
        birthDate: "",
        birthPlace: "",
    });

    const requiredDocuments = useMemo(
        () => documents.filter((document) => document.required),
        []
    );

    const uploadedRequiredCount = requiredDocuments.filter(
        (document) => files[document.id]?.length
    ).length;

    const progress = Math.round((uploadedRequiredCount / requiredDocuments.length) * 100);

    useEffect(() => {
        const savedBooking = localStorage.getItem("passport_booking");

        if (savedBooking) {
            const data = JSON.parse(savedBooking);

            setSelectedBranch(
                branches.find((branch) => branch.id === data.branchId) || branches[0]
            );
            setSelectedDate(data.date || "");
            setSelectedTime(data.time || "");
        }
    }, []);

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast("");
        }, 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    const scrollToSection = (id) => {
        setActiveSection(id);
        setMenuOpen(false);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const updateForm = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleFileUpload = (event, documentId) => {
        const selectedFiles = Array.from(event.target.files || []);

        if (!selectedFiles.length) return;

        const mappedFiles = selectedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
        }));

        setFiles((previous) => ({
            ...previous,
            [documentId]: mappedFiles,
        }));

        setToast("تمت إضافة المستند بنجاح");
    };

    const removeFile = (documentId) => {
        setFiles((previous) => {
            const copy = { ...previous };
            delete copy[documentId];
            return copy;
        });

        setToast("تم حذف المستند");
    };

    const openBooking = (selectedService = "إصدار جواز جديد") => {
        setService(selectedService);
        setStep(1);
        setShowBooking(true);
        document.body.style.overflow = "hidden";
    };

    const closeBooking = () => {
        setShowBooking(false);
        document.body.style.overflow = "auto";
    };

    const nextStep = () => {
        if (step === 1) {
            const emptyField = Object.values(form).some((value) => !value);

            if (emptyField) {
                setToast("يرجى إكمال البيانات الشخصية أولاً");
                return;
            }
        }

        if (step === 2 && uploadedRequiredCount < requiredDocuments.length) {
            setToast("يرجى رفع جميع المستندات المطلوبة");
            return;
        }

        if (step === 3 && (!selectedDate || !selectedTime)) {
            setToast("اختر تاريخ ووقت الموعد");
            return;
        }

        setStep((previous) => Math.min(previous + 1, 4));
    };

    const previousStep = () => {
        setStep((previous) => Math.max(previous - 1, 1));
    };

    const confirmBooking = () => {
        const reference = `LPA-${Date.now().toString().slice(-8)}`;

        const booking = {
            reference,
            service,
            branchId: selectedBranch.id,
            date: selectedDate,
            time: selectedTime,
            name: `${form.firstName} ${form.fatherName} ${form.familyName}`,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem("passport_booking", JSON.stringify(booking));

        setTrackingNumber(reference);
        setTrackingResult({
            reference,
            status: "تم استلام الطلب",
            date: selectedDate,
            time: selectedTime,
            branch: selectedBranch.name,
        });

        setStep(4);
        setToast("تم إنشاء طلبك التجريبي بنجاح");
    };

    const checkTracking = () => {
        if (!trackingNumber.trim()) {
            setToast("أدخل الرقم المرجعي أولاً");
            return;
        }

        const savedBooking = localStorage.getItem("passport_booking");

        if (!savedBooking) {
            setTrackingResult(null);
            setToast("لم يتم العثور على طلب بهذا الرقم في هذا النموذج التجريبي");
            return;
        }

        const booking = JSON.parse(savedBooking);

        if (booking.reference !== trackingNumber.trim()) {
            setTrackingResult(null);
            setToast("الرقم المرجعي غير موجود");
            return;
        }

        setTrackingResult({
            reference: booking.reference,
            status: "تم استلام الطلب",
            date: booking.date,
            time: booking.time,
            branch:
                branches.find((branch) => branch.id === booking.branchId)?.name ||
                "الفرع المحدد",
        });
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <header className="navbar">
                <div className="nav-inner">
                    <button className="brand" onClick={() => scrollToSection("home")}>
                        <span className="brand-symbol">
                            <Fingerprint size={25} />
                        </span>
                        <span>
                            <strong>مِرآة</strong>
                            <small>خدمات جواز السفر</small>
                        </span>
                    </button>

                    <nav className={menuOpen ? "nav-links open" : "nav-links"}>
                        <button onClick={() => scrollToSection("home")}>الرئيسية</button>
                        <button onClick={() => scrollToSection("services")}>الخدمات</button>
                        <button onClick={() => scrollToSection("requirements")}>المستندات</button>
                        <button onClick={() => scrollToSection("branches")}>الفروع</button>
                        <button onClick={() => scrollToSection("faq")}>الأسئلة</button>
                    </nav>

                    <div className="nav-actions">
                        <button
                            className="icon-button"
                            onClick={() => setDarkMode((previous) => !previous)}
                            title="الوضع الليلي"
                        >
                            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
                        </button>

                        <button
                            className="icon-button notification-button"
                            onClick={() => setShowNotifications((previous) => !previous)}
                        >
                            <Bell size={19} />
                            <span className="notification-dot" />
                        </button>

                        <button className="nav-cta" onClick={() => openBooking()}>
                            ابدأ الطلب
                            <ArrowLeft size={17} />
                        </button>

                        <button
                            className="menu-button"
                            onClick={() => setMenuOpen((previous) => !previous)}
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {showNotifications && (
                    <div className="notification-panel">
                        <div className="notification-header">
                            <strong>الإشعارات</strong>
                            <Bell size={18} />
                        </div>
                        <div className="notification-item">
                            <span className="notification-icon">
                                <Info size={17} />
                            </span>
                            <div>
                                <strong>تأكد من المستندات</strong>
                                <p>راجع متطلبات الطلب قبل حجز الموعد.</p>
                            </div>
                        </div>
                        <div className="notification-item">
                            <span className="notification-icon success">
                                <Check size={17} />
                            </span>
                            <div>
                                <strong>النظام جاهز</strong>
                                <p>يمكنك بدء نموذج الحجز التجريبي.</p>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <section id="home" className="hero-section">
                    <div className="hero-overlay" />

                    <div className="hero-content">
                        <div className="hero-badge">
                            <Sparkles size={15} />
                            منظومة رقمية تجريبية
                        </div>

                        <h1>
                            جواز سفرك
                            <span> يبدأ من هنا</span>
                        </h1>

                        <p>
                            تجربة رقمية حديثة لتنظيم طلب جواز السفر، تجهيز المستندات،
                            اختيار الفرع، وحجز الموعد في واجهة واحدة سهلة وواضحة.
                        </p>

                        <div className="hero-actions">
                            <button className="primary-button" onClick={() => openBooking()}>
                                ابدأ طلب جواز السفر
                                <ArrowLeft size={19} />
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() => {
                                    setShowTrack(true);
                                    document.body.style.overflow = "hidden";
                                }}
                            >
                                <Search size={18} />
                                تتبع طلب
                            </button>
                        </div>

                        <div className="hero-trust">
                            <div>
                                <ShieldCheck size={18} />
                                <span>واجهة آمنة</span>
                            </div>
                            <div>
                                <FileCheck2 size={18} />
                                <span>مراجعة المستندات</span>
                            </div>
                            <div>
                                <CalendarDays size={18} />
                                <span>حجز موعد</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-card">
                        <div className="hero-card-top">
                            <div>
                                <small>ابدأ خلال دقائق</small>
                                <h3>احجز موعدك</h3>
                            </div>
                            <span className="passport-icon">
                                <Globe2 size={28} />
                            </span>
                        </div>

                        <div className="hero-card-row">
                            <div>
                                <span>الخدمة</span>
                                <strong>إصدار جواز سفر</strong>
                            </div>
                            <ChevronDown size={18} />
                        </div>

                        <div className="hero-card-row">
                            <div>
                                <span>المدينة</span>
                                <strong>طرابلس</strong>
                            </div>
                            <MapPin size={18} />
                        </div>

                        <button className="card-button" onClick={() => openBooking()}>
                            متابعة الطلب
                            <ArrowLeft size={17} />
                        </button>
                    </div>
                </section>

                <section className="stats-strip">
                    <div>
                        <strong>01</strong>
                        <span>طلب إلكتروني</span>
                    </div>
                    <div>
                        <strong>02</strong>
                        <span>رفع المستندات</span>
                    </div>
                    <div>
                        <strong>03</strong>
                        <span>اختيار الموعد</span>
                    </div>
                    <div>
                        <strong>04</strong>
                        <span>تأكيد الطلب</span>
                    </div>
                </section>

                <section id="services" className="content-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-kicker">الخدمات</span>
                            <h2>كل ما تحتاجه في مكان واحد</h2>
                            <p>
                                اختر نوع المعاملة المناسبة وابدأ الخطوات من خلال نموذج موحد.
                            </p>
                        </div>
                        <button className="text-button" onClick={() => scrollToSection("requirements")}>
                            عرض المتطلبات
                            <ArrowLeft size={17} />
                        </button>
                    </div>

                    <div className="service-grid">
                        {services.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article className="service-card" key={item.title}>
                                    <span className="service-icon">
                                        <Icon size={25} />
                                    </span>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </div>
                                    <button onClick={() => openBooking(item.title)}>
                                        ابدأ
                                        <ArrowLeft size={16} />
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="process-section">
                    <div className="process-background">
                        <div className="process-content">
                            <span className="section-kicker">طريقة العمل</span>
                            <h2>من الطلب إلى الموعد بخطوات واضحة</h2>
                            <p>
                                واجهة مصممة لتقليل الأخطاء ومساعدتك على معرفة الخطوة الحالية
                                والمستندات التي تحتاجها.
                            </p>
                        </div>

                        <div className="process-grid">
                            <div className="process-card">
                                <span>01</span>
                                <UserRound size={25} />
                                <h3>بياناتك</h3>
                                <p>أدخل البيانات الأساسية بطريقة منظمة.</p>
                            </div>

                            <div className="process-card">
                                <span>02</span>
                                <Upload size={25} />
                                <h3>المستندات</h3>
                                <p>ارفع الملفات المطلوبة وشاهد حالة كل مستند.</p>
                            </div>

                            <div className="process-card">
                                <span>03</span>
                                <CalendarDays size={25} />
                                <h3>الموعد</h3>
                                <p>اختر الفرع والتاريخ والوقت المناسب.</p>
                            </div>

                            <div className="process-card">
                                <span>04</span>
                                <FileCheck2 size={25} />
                                <h3>التأكيد</h3>
                                <p>احصل على رقم مرجعي لمتابعة الطلب.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="requirements" className="content-section requirements-section">
                    <div className="section-heading centered">
                        <span className="section-kicker">المستندات</span>
                        <h2>جهز أوراقك قبل الموعد</h2>
                        <p>
                            المتطلبات التالية مأخوذة من المعلومات المنشورة على موقع مصلحة
                            الجوازات، وقد تختلف حسب نوع المعاملة والحالة والفرع.
                        </p>
                    </div>

                    <div className="requirements-layout">
                        <div className="requirements-list">
                            {documents.map((document, index) => (
                                <div className="requirement-item" key={document.id}>
                                    <div className="requirement-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <div className="requirement-content">
                                        <h3>{document.title}</h3>
                                        <p>{document.description}</p>
                                    </div>
                                    <span className={document.required ? "required" : "optional"}>
                                        {document.required ? "مطلوب" : "حسب الحالة"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="requirements-note">
                            <div className="note-icon">
                                <Info size={24} />
                            </div>
                            <h3>ملاحظة مهمة</h3>
                            <p>
                                تحقق دائمًا من أحدث التعليمات الرسمية قبل تقديم أي مستندات،
                                لأن المتطلبات والإجراءات والرسوم قد تتغير.
                            </p>
                            <a
                                href="https://lpa.gov.ly/faq"
                                target="_blank"
                                rel="noreferrer"
                            >
                                قراءة الأسئلة الرسمية
                                <ArrowLeft size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                <section id="branches" className="branches-section">
                    <div className="content-section">
                        <div className="section-heading">
                            <div>
                                <span className="section-kicker">الفروع</span>
                                <h2>اختر الفرع الأقرب إليك</h2>
                                <p>الفروع المعروضة هنا نموذجية لأغراض التصميم والحجز التجريبي.</p>
                            </div>
                            <MapPin className="heading-map" size={36} />
                        </div>

                        <div className="branch-grid">
                            {branches.map((branch) => (
                                <article className="branch-card" key={branch.id}>
                                    <div className="branch-top">
                                        <span className="branch-icon">
                                            <Landmark size={22} />
                                        </span>
                                        <span className="open-status">
                                            <i />
                                            متاح للحجز
                                        </span>
                                    </div>
                                    <h3>{branch.name}</h3>
                                    <p>
                                        <MapPin size={15} />
                                        {branch.city} — {branch.address}
                                    </p>
                                    <button onClick={() => openBooking()}>
                                        اختيار الفرع
                                        <ArrowLeft size={16} />
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="security-section">
                    <div className="security-card">
                        <div className="security-icon">
                            <LockKeyhole size={30} />
                        </div>
                        <div>
                            <span>الخصوصية أولاً</span>
                            <h2>بياناتك لا تُرسل إلى جهة حكومية من هذا النموذج</h2>
                            <p>
                                هذا المشروع نموذج Frontend للتعلم فقط. رفع الملفات والمعالجة
                                هنا محليان داخل المتصفح، ولا توجد قاعدة بيانات حكومية مرتبطة به.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="faq" className="content-section faq-section">
                    <div className="section-heading centered">
                        <span className="section-kicker">الأسئلة الشائعة</span>
                        <h2>أسئلة قبل أن تبدأ</h2>
                    </div>

                    <div className="faq-grid">
                        <details open>
                            <summary>
                                ما المستندات المطلوبة؟
                                <ChevronDown size={18} />
                            </summary>
                            <p>
                                تختلف حسب نوع المعاملة. مصلحة الجوازات تنشر المتطلبات الرسمية
                                والنماذج عبر موقعها، لذلك يجب مراجعة آخر تعليمات قبل التقديم.
                            </p>
                        </details>

                        <details>
                            <summary>
                                هل أستطيع متابعة الطلب؟
                                <ChevronDown size={18} />
                            </summary>
                            <p>
                                هذا النموذج يحتوي على متابعة تجريبية باستخدام الرقم المرجعي
                                المخزن محليًا في المتصفح.
                            </p>
                        </details>

                        <details>
                            <summary>
                                هل رفع الملفات حقيقي؟
                                <ChevronDown size={18} />
                            </summary>
                            <p>
                                في هذا المشروع هو رفع محلي للمعاينة فقط، وليس إرسالًا إلى خادم
                                حكومي أو قاعدة بيانات.
                            </p>
                        </details>

                        <details>
                            <summary>
                                أين أجد الفروع الرسمية؟
                                <ChevronDown size={18} />
                            </summary>
                            <p>
                                يمكنك الرجوع إلى دليل فروع مصلحة الجوازات الرسمي لمعرفة الفروع
                                المنشورة ومواقعها.
                            </p>
                        </details>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="brand">
                            <span className="brand-symbol">
                                <Fingerprint size={25} />
                            </span>
                            <span>
                                <strong>مِرآة</strong>
                                <small>خدمات جواز السفر</small>
                            </span>
                        </div>
                        <p>
                            مشروع واجهة تجريبية حديثة لتعلم React وبناء منظومات الخدمات
                            الإلكترونية.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>روابط</h4>
                        <button onClick={() => scrollToSection("home")}>الرئيسية</button>
                        <button onClick={() => scrollToSection("services")}>الخدمات</button>
                        <button onClick={() => scrollToSection("requirements")}>
                            المستندات
                        </button>
                    </div>

                    <div className="footer-column">
                        <h4>معلومات</h4>
                        <a href="https://lpa.gov.ly/" target="_blank" rel="noreferrer">
                            الموقع الرسمي للمصلحة
                        </a>
                        <a href="https://lpa.gov.ly/branches" target="_blank" rel="noreferrer">
                            دليل الفروع
                        </a>
                        <a href="https://lpa.gov.ly/faq" target="_blank" rel="noreferrer">
                            الأسئلة الرسمية
                        </a>
                    </div>

                    <div className="footer-contact">
                        <h4>تواصل</h4>
                        <div>
                            <Phone size={16} />
                            <span>+218 92 4215234</span>
                        </div>
                        <div>
                            <Headphones size={16} />
                            <span>الدعم والمعلومات</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Mir'ah — مشروع React تجريبي</span>
                    <span>صمم للتعلم والتطوير</span>
                </div>
            </footer>

            {showBooking && (
                <div className="modal-backdrop">
                    <div className="booking-modal">
                        <div className="modal-header">
                            <div>
                                <span>نموذج الطلب</span>
                                <h2>{service}</h2>
                            </div>

                            <button className="close-modal" onClick={closeBooking}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="steps">
                            {[
                                ["01", "البيانات"],
                                ["02", "المستندات"],
                                ["03", "الموعد"],
                                ["04", "التأكيد"],
                            ].map(([number, title], index) => (
                                <div
                                    className={step >= index + 1 ? "step active" : "step"}
                                    key={number}
                                >
                                    <span>{number}</span>
                                    <small>{title}</small>
                                </div>
                            ))}
                        </div>

                        <div className="modal-body">
                            {step === 1 && (
                                <div className="form-step">
                                    <div className="step-title">
                                        <div>
                                            <span>الخطوة الأولى</span>
                                            <h3>بيانات صاحب الطلب</h3>
                                        </div>
                                        <UserRound />
                                    </div>

                                    <div className="form-grid">
                                        <label>
                                            الاسم
                                            <input
                                                value={form.firstName}
                                                onChange={(event) =>
                                                    updateForm("firstName", event.target.value)
                                                }
                                                placeholder="مثال: محمد"
                                            />
                                        </label>

                                        <label>
                                            اسم الأب
                                            <input
                                                value={form.fatherName}
                                                onChange={(event) =>
                                                    updateForm("fatherName", event.target.value)
                                                }
                                                placeholder="اسم الأب"
                                            />
                                        </label>

                                        <label>
                                            اسم الجد
                                            <input
                                                value={form.grandfatherName}
                                                onChange={(event) =>
                                                    updateForm("grandfatherName", event.target.value)
                                                }
                                                placeholder="اسم الجد"
                                            />
                                        </label>

                                        <label>
                                            اللقب
                                            <input
                                                value={form.familyName}
                                                onChange={(event) =>
                                                    updateForm("familyName", event.target.value)
                                                }
                                                placeholder="اللقب"
                                            />
                                        </label>

                                        <label>
                                            الرقم الوطني
                                            <input
                                                value={form.nationalNumber}
                                                onChange={(event) =>
                                                    updateForm("nationalNumber", event.target.value)
                                                }
                                                inputMode="numeric"
                                                maxLength="12"
                                                placeholder="للنموذج التجريبي فقط"
                                            />
                                        </label>

                                        <label>
                                            رقم الهاتف
                                            <input
                                                value={form.phone}
                                                onChange={(event) =>
                                                    updateForm("phone", event.target.value)
                                                }
                                                inputMode="tel"
                                                placeholder="+218 ..."
                                            />
                                        </label>

                                        <label>
                                            البريد الإلكتروني
                                            <input
                                                value={form.email}
                                                onChange={(event) =>
                                                    updateForm("email", event.target.value)
                                                }
                                                type="email"
                                                placeholder="name@example.com"
                                            />
                                        </label>

                                        <label>
                                            تاريخ الميلاد
                                            <input
                                                value={form.birthDate}
                                                onChange={(event) =>
                                                    updateForm("birthDate", event.target.value)
                                                }
                                                type="date"
                                            />
                                        </label>

                                        <label className="full">
                                            مكان الميلاد
                                            <input
                                                value={form.birthPlace}
                                                onChange={(event) =>
                                                    updateForm("birthPlace", event.target.value)
                                                }
                                                placeholder="المدينة / البلدية"
                                            />
                                        </label>
                                    </div>

                                    <div className="demo-warning">
                                        <Info size={18} />
                                        <span>
                                            لا تستخدم بياناتك الحقيقية في هذا المشروع التجريبي.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="form-step">
                                    <div className="step-title">
                                        <div>
                                            <span>الخطوة الثانية</span>
                                            <h3>رفع المستندات</h3>
                                        </div>
                                        <Upload />
                                    </div>

                                    <div className="upload-progress">
                                        <div className="progress-top">
                                            <span>اكتمال المستندات المطلوبة</span>
                                            <strong>{progress}%</strong>
                                        </div>
                                        <div className="progress-bar">
                                            <span style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>

                                    <div className="upload-grid">
                                        {documents.map((document) => (
                                            <div
                                                className={
                                                    files[document.id]?.length
                                                        ? "upload-card uploaded"
                                                        : "upload-card"
                                                }
                                                key={document.id}
                                            >
                                                <div className="upload-card-top">
                                                    <span className="upload-file-icon">
                                                        {files[document.id]?.length ? (
                                                            <Check size={21} />
                                                        ) : (
                                                            <FileImage size={21} />
                                                        )}
                                                    </span>

                                                    <span
                                                        className={
                                                            document.required ? "required" : "optional"
                                                        }
                                                    >
                                                        {document.required ? "مطلوب" : "اختياري"}
                                                    </span>
                                                </div>

                                                <h4>{document.title}</h4>
                                                <p>{document.description}</p>

                                                {files[document.id]?.length ? (
                                                    <div className="file-preview">
                                                        <div>
                                                            <FileText size={16} />
                                                            <span>{files[document.id][0].name}</span>
                                                        </div>
                                                        <button onClick={() => removeFile(document.id)}>
                                                            <X size={15} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="upload-button">
                                                        <Upload size={16} />
                                                        رفع الملف
                                                        <input
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            multiple={document.multiple}
                                                            onChange={(event) =>
                                                                handleFileUpload(event, document.id)
                                                            }
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="form-step">
                                    <div className="step-title">
                                        <div>
                                            <span>الخطوة الثالثة</span>
                                            <h3>اختيار الفرع والموعد</h3>
                                        </div>
                                        <CalendarDays />
                                    </div>

                                    <div className="appointment-layout">
                                        <div className="branch-picker">
                                            <h4>اختر الفرع</h4>

                                            {branches.map((branch) => (
                                                <button
                                                    className={
                                                        selectedBranch.id === branch.id
                                                            ? "branch-option selected"
                                                            : "branch-option"
                                                    }
                                                    key={branch.id}
                                                    onClick={() => {
                                                        setSelectedBranch(branch);
                                                        setSelectedTime("");
                                                    }}
                                                >
                                                    <span>
                                                        <Landmark size={19} />
                                                    </span>
                                                    <div>
                                                        <strong>{branch.name}</strong>
                                                        <small>{branch.address}</small>
                                                    </div>
                                                    {selectedBranch.id === branch.id && (
                                                        <Check size={18} />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="date-picker">
                                            <h4>اختر التاريخ</h4>

                                            <input
                                                type="date"
                                                value={selectedDate}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={(event) => setSelectedDate(event.target.value)}
                                            />

                                            <h4>الأوقات المتاحة</h4>

                                            <div className="time-grid">
                                                {selectedBranch.appointments.map((time) => (
                                                    <button
                                                        className={
                                                            selectedTime === time ? "time selected" : "time"
                                                        }
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                    >
                                                        <Clock3 size={15} />
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="confirmation-step">
                                    <div className="success-circle">
                                        <Check size={38} />
                                    </div>

                                    <span className="success-label">تم إنشاء الطلب</span>
                                    <h3>تم تسجيل طلبك التجريبي بنجاح</h3>
                                    <p>
                                        احتفظ بالرقم المرجعي التالي لاستخدامه في صفحة متابعة الطلب.
                                    </p>

                                    <div className="reference-box">
                                        <span>الرقم المرجعي</span>
                                        <strong>{trackingNumber}</strong>
                                    </div>

                                    <div className="confirmation-details">
                                        <div>
                                            <span>الخدمة</span>
                                            <strong>{service}</strong>
                                        </div>
                                        <div>
                                            <span>الفرع</span>
                                            <strong>{selectedBranch.name}</strong>
                                        </div>
                                        <div>
                                            <span>التاريخ</span>
                                            <strong>{selectedDate}</strong>
                                        </div>
                                        <div>
                                            <span>الوقت</span>
                                            <strong>{selectedTime}</strong>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            {step > 1 && step < 4 && (
                                <button className="back-button" onClick={previousStep}>
                                    <ArrowRight size={17} />
                                    السابق
                                </button>
                            )}

                            {step < 3 && (
                                <button className="primary-button modal-next" onClick={nextStep}>
                                    التالي
                                    <ArrowLeft size={17} />
                                </button>
                            )}

                            {step === 3 && (
                                <button
                                    className="primary-button modal-next"
                                    onClick={confirmBooking}
                                >
                                    تأكيد الحجز
                                    <Check size={17} />
                                </button>
                            )}

                            {step === 4 && (
                                <button
                                    className="primary-button modal-next"
                                    onClick={() => {
                                        closeBooking();
                                        setShowTrack(true);
                                        document.body.style.overflow = "hidden";
                                    }}
                                >
                                    متابعة الطلب
                                    <Search size={17} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showTrack && (
                <div className="modal-backdrop">
                    <div className="track-modal">
                        <button
                            className="close-modal"
                            onClick={() => {
                                setShowTrack(false);
                                document.body.style.overflow = "auto";
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div className="track-header">
                            <span className="track-icon">
                                <Search size={24} />
                            </span>
                            <span>متابعة الطلب</span>
                            <h2>أين وصل طلبك؟</h2>
                            <p>أدخل الرقم المرجعي الذي حصلت عليه بعد الحجز.</p>
                        </div>

                        <div className="tracking-input">
                            <input
                                value={trackingNumber}
                                onChange={(event) => setTrackingNumber(event.target.value)}
                                placeholder="مثال: LPA-12345678"
                            />
                            <button onClick={checkTracking}>
                                بحث
                                <Search size={17} />
                            </button>
                        </div>

                        {trackingResult && (
                            <div className="tracking-result">
                                <div className="tracking-result-top">
                                    <span className="status-badge">
                                        <Check size={14} />
                                        {trackingResult.status}
                                    </span>
                                    <strong>{trackingResult.reference}</strong>
                                </div>

                                <div className="tracking-line">
                                    <div className="tracking-point active">
                                        <Check size={15} />
                                    </div>
                                    <div>
                                        <strong>تم استلام الطلب</strong>
                                        <p>تم تسجيل الطلب في النموذج التجريبي.</p>
                                    </div>
                                </div>

                                <div className="tracking-line">
                                    <div className="tracking-point">
                                        <Clock3 size={15} />
                                    </div>
                                    <div>
                                        <strong>الموعد</strong>
                                        <p>
                                            {trackingResult.date} — {trackingResult.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="tracking-line">
                                    <div className="tracking-point">
                                        <MapPin size={15} />
                                    </div>
                                    <div>
                                        <strong>الفرع</strong>
                                        <p>{trackingResult.branch}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {toast && (
                <div className="toast">
                    <span>
                        <Check size={17} />
                    </span>
                    {toast}
                </div>
            )}
        </div>
    );
}

export default App;