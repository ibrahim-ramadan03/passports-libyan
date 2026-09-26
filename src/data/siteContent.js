export const navItems = [
    { key: 'home', en: 'Home', ar: 'الرئيسية' },
    { key: 'about', en: 'About Me', ar: 'عني' },
    { key: 'services', en: 'Services', ar: 'الخدمات' },
    { key: 'skills', en: 'Skills', ar: 'المهارات' },
    { key: 'contact', en: 'Contact Me', ar: 'تواصل معي' },
    { key: 'library', en: 'Library', ar: 'المكتبة' },
];

export const services = [
    {
        title: { en: 'Web Development', ar: 'تطوير الويب' },
        description: {
            en: 'Modern responsive websites built with clean code and efficient structure.',
            ar: 'مواقع حديثة ومتجاوبة مع كود نظيف وبنية فعالة.',
        },
    },
    {
        title: { en: 'UI / UX Design', ar: 'تصميم واجهات' },
        description: {
            en: 'Beautiful interfaces centered on user experience and clarity.',
            ar: 'واجهات جميلة تركز على تجربة المستخدم والوضوح.',
        },
    },
    {
        title: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' },
        description: {
            en: 'Cross-platform mobile solutions with practical features and smooth flows.',
            ar: 'حلول جوال متعددة المنصات بميزات عملية وتجربة سلسة.',
        },
    },
];

export const skills = [
    { name: 'HTML / CSS', level: 'Advanced' },
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Python', level: 'Intermediate' },
];

export const books = [
    { title: 'HTML5 and CSS3', category: 'Web', type: 'Book' },
    { title: 'JavaScript Essentials', category: 'Programming', type: 'Guide' },
    { title: 'Design Systems', category: 'Design', type: 'Book' },
    { title: 'Python for Beginners', category: 'Programming', type: 'Book' },
];

export function getText(lang) {
    const isArabic = lang === 'ar';

    return {
        heroGreeting: isArabic ? 'مرحباً،' : 'Hello,',
        heroName: isArabic ? 'أنا إبراهيم' : 'I am Ibrahim',
        heroTitle: isArabic ? 'مبرمج ومصمم مواقع' : 'Developer & Web Designer',
        cv: isArabic ? 'تحميل السيرة' : 'Download CV',
        subscribe: isArabic ? 'اشتراك' : 'Subscribe',
        aboutTitle: isArabic ? 'عني' : 'About Me',
        aboutText: isArabic
            ? 'أنا مطور ويب شغوف أركز على بناء تجارب رقمية حديثة ومتجاوبة. أحب تحويل الأفكار إلى واجهات عملية وجذابة، مع اهتمام خاص بالتفاصيل وسهولة الاستخدام.'
            : 'I am a passionate web developer focused on building modern, responsive digital experiences. I enjoy turning ideas into clear, attractive interfaces with strong attention to detail and usability.',
        servicesTitle: isArabic ? 'الخدمات' : 'Services',
        skillsTitle: isArabic ? 'المهارات' : 'Skills',
        libraryTitle: isArabic ? 'المكتبة' : 'Library',
        libraryPlaceholder: isArabic ? 'ابحث عن كتاب...' : 'Search a book...',
        contactTitle: isArabic ? 'تواصل معي' : 'Contact Me',
        contactBtn: isArabic ? 'إرسال الرسالة' : 'Send Message',
        langToggle: isArabic ? 'English' : 'العربية',
        currentPerson: isArabic ? 'الاسم' : 'Name',
        emailLabel: isArabic ? 'البريد' : 'Email',
        messageLabel: isArabic ? 'الرسالة' : 'Message',
        namePlaceholder: isArabic ? 'أدخل اسمك' : 'Enter your name',
        emailPlaceholder: isArabic ? 'أدخل بريدك' : 'Enter your email',
        messagePlaceholder: isArabic ? 'اكتب رسالتك' : 'Write your message',
        filterAll: isArabic ? 'كل الفئات' : 'All Categories',
        filterProgramming: isArabic ? 'برمجة' : 'Programming',
        filterDesign: isArabic ? 'تصميم' : 'Design',
    };
}
