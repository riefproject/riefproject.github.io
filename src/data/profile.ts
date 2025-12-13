export type LocaleText = {
	en: string;
	id: string;
};

const t = (en: string, id: string): LocaleText => ({ en, id });

export type Profile = {
	name: string;
	role: LocaleText;
	tagline: LocaleText;
	location: LocaleText;
	photo?: string;
	availability: LocaleText;
	intro: LocaleText;
	bio: LocaleText;
	focusStack: LocaleText;
};

export type Highlight = {
	label: LocaleText;
	detail: LocaleText;
};

export type Stat = {
	label: LocaleText;
	value: string;
	helper?: LocaleText;
};

export type SocialLink = {
	label: string;
	url: string;
	hint?: string;
};

export type CPProfile = {
	platform: string;
	handle: string;
	url: string;
	logo?: string;
	note?: LocaleText;
};

export type TechStack = {
	name: string;
	category: 'language' | 'framework' | 'tool';
	logo?: string;
};

export type FocusArea = {
	title: LocaleText;
	description: LocaleText;
	items: LocaleText[];
};

export type SkillCategory = {
	title: LocaleText;
	items: LocaleText[];
	helper?: LocaleText;
};

export type Experience = {
	company: string;
	logo?: string;
	role: LocaleText;
	period: string;
	summary: LocaleText;
	stack: string[];
	achievements: LocaleText[];
};

export type Education = {
	institution: string;
	logo?: string;
	program: LocaleText;
	period: string;
	details: LocaleText[];
};

export type AchievementType = 'competitions' | 'certifications' | 'bootcamps';

export type Achievement = {
	type: AchievementType;
	title: LocaleText;
	issuer: LocaleText;
	date: string;
	highlight?: LocaleText;
	link?: string;
};

export type AchievementTab = {
	id: AchievementType;
	name: LocaleText;
};

export type Project = {
	title: LocaleText;
	description: LocaleText;
	year: number;
	category: LocaleText;
	categoryKey: string;
	stack: string[];
	highlights: LocaleText[];
	link?: {
		label: LocaleText;
		url: string;
	};
};

export type Contact = {
	email: string;
	phone: string;
	message: LocaleText;
	availabilityNote: LocaleText;
};

export const profile: Profile = {
	name: 'Arief F-sa Wijaya',
	role: t('Informatics Engineering Student', 'Mahasiswa D3 Teknik Informatika'),
	tagline: t('Problem solver and competitive programming enthusiast who ships fast with care.', 'Problem solver dan pecinta competitive programming yang suka eksekusi cepat dan rapi.'),
	location: t('West Bandung, Indonesia', 'Bandung Barat, Indonesia'),
	availability: t(
		'Available for internships, collaborations, and mentoring sessions.',
		'Siap untuk internship, kolaborasi, dan sesi mentoring.',
	),
	intro: t(
		'OSN-bred problem solver pairing algorithmic rigor with practical shipping—turning constraints into working features.',
		'Problem solver jebolan OSN yang memadukan ketelitian algoritma dengan eksekusi praktis—menerjemahkan constraint jadi fitur yang jalan.',
	),
	bio: t(
		'Currently studying Informatics Engineering at Politeknik Negeri Bandung while growing Brainware of SMANSA. Balances competitive programming, backend tinkering, and mentoring with a focus on efficient, reliable systems that feel good to use.',
		'Sedang menempuh Teknik Informatika di Politeknik Negeri Bandung sambil membesarkan Brainware of SMANSA. Menyeimbangkan competitive programming, oprek backend, dan mentoring dengan fokus pada sistem efisien, andal, dan nyaman dipakai.',
	),
	focusStack: t(
		'C/C++ · Competitive Programming · Backend & Automation',
		'C/C++ · Competitive Programming · Backend & Automation',
	),
};

export const heroHighlights: Highlight[] = [
	{
		label: t('Competitive Programming', 'Competitive Programming'),
		detail: t('10+ contests from school scrims to NOI/OSN stages', '10+ kontes dari sparing sekolah sampai tahapan NOI/OSN'),
	},
	{
		label: t('Leadership', 'Leadership'),
		detail: t('Led Brainware SMANSA; labs stayed active (2022–2023)', 'Memimpin Brainware SMANSA; lab tetap aktif (2022–2023)'),
	},
	{
		label: t('Core Interests', 'Fokus Utama'),
		detail: t('Backend automation, diagnostic tools, and mentoring juniors', 'Backend automation, tools diagnostik, dan mentoring junior'),
	},
];

export const stats: Stat[] = [
	{
		label: t('Contests tackled', 'Kompetisi diikuti'),
		value: '10+',
		helper: t('NOI/OSN plus internal scrims and showcases', 'NOI/OSN plus sparing internal dan showcase'),
	},
	{
		label: t('Problems solved', 'Soal terselesaikan'),
		value: '300+',
		helper: t('TLX, LeetCode, Codeforces, and others', 'TLX, LeetCode, Codeforces, dan lainnya'),
	},
	{
		label: t('Languages used', 'Bahasa yang dikuasai'),
		value: '8+',
		helper: t('C, C++, Python, JavaScript, Java, plus supporting scripts', 'C, C++, Python, JavaScript, Java, plus skrip pendukung'),
	},
	{
		label: t('Projects delivered', 'Proyek selesai'),
		value: '10+',
		helper: t('School, club, and personal builds', 'Proyek sekolah, komunitas, dan proyek pribadi'),
	},
];

export const socials: SocialLink[] = [
	{ label: 'LinkedIn', url: 'https://linkedin.com/in/arief-f-sa-wijaya-9aa935319', hint: 'Perjalanan karier' },
	{ label: 'GitHub', url: 'https://github.com/riefproject', hint: 'Repositori & eksperimen' },
	{ label: 'Instagram', url: 'https://instagram.com/fsarf_', hint: 'Aktivitas harian' },
	{ label: 'Email', url: 'mailto:talktorief@gmail.com', hint: 'Kirim pesan langsung' },
];

export const cpProfiles: CPProfile[] = [
	{
		platform: 'Codeforces',
		handle: 'your-handle',
		url: 'https://codeforces.com/profile/your-handle',
		logo: '/img/codeforces.webp',
		note: t('Regular contests and upsolving logs.', 'Kontes rutin dan catatan upsolve.'),
	},
	{
		platform: 'TLX',
		handle: 'your-handle',
		url: 'https://tlx.toki.id/users/your-handle',
		logo: '/img/tlx.png',
		note: t('Practice sets and local contests.', 'Latihan set dan kontes lokal.'),
	},
	{
		platform: 'LeetCode',
		handle: 'your-handle',
		url: 'https://leetcode.com/your-handle',
		logo: '/img/leetcode.png',
		note: t('Daily drills for data structures and algorithms.', 'Latihan harian struktur data dan algoritma.'),
	},
	{
		platform: 'AtCoder',
		handle: 'your-handle',
		url: 'https://atcoder.jp/users/your-handle',
		logo: '/img/HackerRank.png',
		note: t('Weekend rounds and speed benchmarks.', 'Round akhir pekan dan tolok ukur kecepatan.'),
	},
];

export const focusAreas: FocusArea[] = [
	{
		title: t('Competitive programming mindset', 'Competitive programming mindset'),
		description: t(
			'Apply olympiad-style thinking to daily engineering: test constraints, budget time, and choose clean patterns quickly.',
			'Pakai pola pikir olimpiade ke engineering harian: uji constraint, atur time budget, dan pilih pola yang rapi dengan cepat.',
		),
		items: [
			t('Contest-grade algorithm reviews', 'Review algoritma setingkat kontes'),
			t('Structured drills and training modules', 'Drill terstruktur dan modul latihan'),
			t('Data-driven retrospectives and scorecards', 'Retrospektif berbasis data dan scorecard'),
		],
	},
	{
		title: t('Backend & tooling', 'Backend & tooling'),
		description: t(
			'Build lightweight C/C++ systems with a focus on automation, diagnostics, and developer comfort.',
			'Membangun sistem C/C++ yang ringan dengan fokus otomasi, diagnostik, dan kenyamanan developer.',
		),
		items: [
			t('CLI and desktop utilities with clear flows', 'CLI dan desktop utility dengan alur jelas'),
			t('Raylib / Qt playgrounds for UI and graphics', 'Playground Raylib / Qt untuk UI dan grafis'),
			t('Structured logging and reporting teams can act on', 'Logging dan reporting terstruktur yang mudah ditindak'),
		],
	},
	{
		title: t('Mentorship & community', 'Mentorship & community'),
		description: t(
			'Grow together via Brainware of SMANSA—mentoring juniors, sharing playbooks, and keeping resources open.',
			'Berkembang bersama lewat Brainware of SMANSA—mentoring junior, berbagi playbook, dan menjaga resource tetap terbuka.',
		),
		items: [
			t('Club leadership & workshops', 'Kepemimpinan klub & workshop'),
			t('Mentoring for NOI hopefuls', 'Mentoring untuk calon NOI'),
			t('Open resources & documentation', 'Resource & dokumentasi terbuka'),
		],
	},
];

export const skillCategories: SkillCategory[] = [
	{
		title: t('Summary', 'Ringkasan'),
		items: [
			t('Problem solving & pattern finding', 'Problem solving & menemukan pola'),
			t('Competitive programming & contest prep', 'Competitive programming & persiapan kontes'),
			t('Data structures & algorithms', 'Data structure & algorithm'),
			t('Web/backend fundamentals for shipping prototypes', 'Dasar web/backend untuk eksekusi prototipe'),
			t('Leadership & mentoring juniors', 'Leadership & mentoring junior'),
		],
	},
	{
		title: t('Programming languages', 'Bahasa pemrograman'),
		items: [
			t('C / C++ (primary)', 'C / C++ (utama)'),
			t('Python for automation & tooling', 'Python untuk automation & tooling'),
			t('JavaScript for web & prototyping', 'JavaScript untuk web & prototyping'),
			t('Java basics for coursework', 'Java dasar untuk tugas kuliah'),
		],
		helper: t('Also touches PHP, HTML/CSS, and SQL basics', 'Menjelajah PHP, HTML/CSS, dan dasar SQL'),
	},
	{
		title: t('Tools & frameworks', 'Perangkat & framework'),
		items: [
			t('Raylib for game experiments', 'Raylib buat eksperimen gim'),
			t('Qt for desktop interfaces', 'Qt buat antarmuka desktop'),
			t('Node.js & Express fundamentals', 'Dasar Node.js & Express'),
			t('Git / GitHub for collaboration', 'Git / GitHub buat kolaborasi'),
		],
	},
	{
		title: t('Soft skills & community', 'Soft skill & komunitas'),
		items: [
			t('Club leadership & event planning', 'Kepemimpinan klub & perencanaan acara'),
			t('Curriculum design for juniors', 'Desain kurikulum untuk junior'),
			t('Public speaking & presentation', 'Public speaking & presentasi'),
			t('Documentation & knowledge sharing', 'Dokumentasi & berbagi ilmu'),
		],
	},
];

export const toolbox: string[] = [
	'C',
	'C++',
	'Python',
	'JavaScript',
	'Raylib',
	'Qt',
	'Node.js',
	'Express',
	'Git & GitHub',
	'MySQL',
];

export const stackShowcase: TechStack[] = [
	{ name: 'C', category: 'language', logo: '' },
	{ name: 'C++', category: 'language', logo: '' },
	{ name: 'C#', category: 'language', logo: '' },
	{ name: 'Java', category: 'language', logo: '' },
	{ name: 'JavaScript', category: 'language', logo: '' },
	{ name: 'Python', category: 'language', logo: '' },
	{ name: 'PHP', category: 'language', logo: '' },
	{ name: 'React.js', category: 'framework', logo: '' },
	{ name: 'Vue.js', category: 'framework', logo: '' },
	{ name: 'Astro', category: 'framework', logo: '' },
	{ name: 'Tailwind CSS', category: 'framework', logo: '' },
	{ name: 'Bootstrap', category: 'framework', logo: '' },
	{ name: 'Express', category: 'framework', logo: '' },
	{ name: 'Laravel', category: 'framework', logo: '' },
	{ name: 'PostgreSQL', category: 'tool', logo: '' },
	{ name: 'MongoDB', category: 'tool', logo: '' },
	{ name: 'Git', category: 'tool', logo: '' },
	{ name: 'GitHub', category: 'tool', logo: '' },
	{ name: 'GitLab', category: 'tool', logo: '' },
];

export const experiences: Experience[] = [
	{
		company: 'Brainware of SMANSA (BIoS)',
		logo: '/img/biossmansa.png',
		role: t('Head of Programming Division', 'Kepala Divisi Programming'),
		period: '2022 — 2023',
		summary: t(
			'Led SMANSA’s computer club—built training tracks, ran competitions, and kept the community active.',
			'Memimpin klub komputer SMANSA—menyusun jalur latihan, mengadakan kompetisi, dan menjaga komunitas tetap aktif.',
		),
		stack: ['Leadership', 'Curriculum Design', 'C/C++', 'Community'],
		achievements: [
			t(
				'Designed multi-level programming bootcamps so newcomers and seniors each had a track.',
				'Menyusun bootcamp bertahap sehingga anggota baru maupun senior punya jalur belajar.',
			),
			t(
				'Hosted showcases and talks to build interest in product building and problem solving.',
				'Mengadakan showcase dan sesi berbagi untuk menumbuhkan minat membangun produk dan problem solving.',
			),
			t(
				'Mentored juniors for NOI/OSN so their algorithm foundations stick.',
				'Mementori junior jelang NOI/OSN agar fondasi algoritmanya mantap.',
			),
		],
	},
	{
		company: 'Independent Competitive Programming Journey',
		logo: '/img/codeforces.webp',
		role: t('Problem Solver & Coach', 'Problem Solver & Coach'),
		period: '2021 — Sekarang',
		summary: t(
			'Solving problems on TLX, LeetCode, Codeforces, then turning the lessons into mentoring sessions.',
			'Menyelesaikan soal di TLX, LeetCode, Codeforces, lalu menerjemahkan pelajarannya ke sesi mentoring.',
		),
		stack: ['C++', 'Python', 'TLX', 'LeetCode', 'Codeforces'],
		achievements: [
			t('300+ problems solved with notes and templates reused by peers.', '300+ soal terselesaikan dengan catatan & template yang dipakai ulang.'),
			t('Created visual aids to explain tricky DS/Algo concepts to friends.', 'Membuat visualisasi untuk menjelaskan konsep DS/Algo yang sulit.'),
			t('Hosted sharing sessions and micro-challenges for classmates.', 'Mengadakan sharing session dan micro-challenge untuk teman sekelas.'),
		],
	},
];

export const education: Education[] = [
	{
		institution: 'Politeknik Negeri Bandung',
		logo: '/img/polban.png',
		program: t('D3 Informatics Engineering', 'D3 Teknik Informatika'),
		period: '2022 — Sekarang',
		details: [
			t(
				'Focusing on distributed systems, databases, and software engineering foundations.',
				'Fokus pada sistem terdistribusi, database, dan dasar software engineering.',
			),
			t('Merit scholarship recipient and OSN Informatics finalist.', 'Penerima beasiswa prestasi akademik dan finalis OSN Informatika.'),
			t('Coordinator for the Competitive Programming & System Design lab.', 'Koordinator lab Competitive Programming & System Design di kampus.'),
		],
	},
	{
		institution: 'SMA Negeri 1 Subang',
		logo: '/img/smansa.png',
		program: t('Mathematics & Natural Sciences', 'Matematika & Ilmu Pengetahuan Alam'),
		period: '2021 — 2024',
		details: [
			t('Started as member, later led Brainware of SMANSA.', 'Mulai sebagai anggota, lalu memimpin Brainware of SMANSA.'),
			t('Represented school in OSN Informatics and programming showcases.', 'Mewakili sekolah di OSN Informatika dan showcase programming.'),
		],
	},
];

export const achievements: Achievement[] = [
	{
		type: 'competitions',
		title: t('Indonesia National Contest 2025 (ICPC Indonesia)', 'Indonesia National Contest 2025 (ICPC Indonesia)'),
		issuer: t('ICPC Indonesia', 'ICPC Indonesia'),
		date: '2025',
		highlight: t('Ranked · 55th · Qualified to ICPC Asia · Honorable Mention', 'Ranked · Peringkat 55 · Lolos ke ICPC Asia · Honorable Mention'),
		link: 'https://icpc.global/',
	},
	{
		type: 'competitions',
		title: t('ICPC Asia Jakarta Regional Contest 2025', 'ICPC Asia Jakarta Regional Contest 2025'),
		issuer: t('ICPC Foundation · BINUS University', 'ICPC Foundation · BINUS University'),
		date: '2025',
		highlight: t('Regional Contestant', 'Peserta Regional'),
		link: 'https://icpc.global/',
	},
	{
		type: 'competitions',
		title: t('OSN Informatics 2022', 'OSN Informatika 2022'),
		issuer: t('National Achievement Center (Puspresnas)', 'Pusat Prestasi Nasional (Puspresnas)'),
		date: '2022',
		highlight: t('District Champion · Provincial Participant', 'Juara Kabupaten · Peserta Provinsi'),
		link: 'https://puspresnas.kemdikbud.go.id/',
	},
	{
		type: 'competitions',
		title: t('OSN Informatics 2023', 'OSN Informatika 2023'),
		issuer: t('National Achievement Center (Puspresnas)', 'Pusat Prestasi Nasional (Puspresnas)'),
		date: '2023',
		highlight: t('District Participant', 'Peserta Kabupaten'),
		link: 'https://puspresnas.kemdikbud.go.id/',
	},
	{
		type: 'certifications',
		title: t('Fundamental C++ Programming', 'Belajar Dasar Pemrograman C++'),
		issuer: t('Dicoding Indonesia', 'Dicoding Indonesia'),
		date: '2024',
		highlight: t('Official Certificate', 'Sertifikat Resmi'),
		link: 'https://www.dicoding.com/certificates/cpp-basic',
	},
	{
		type: 'certifications',
		title: t('Database Design & SQL', 'Database Design & SQL'),
		issuer: t('Udemy', 'Udemy'),
		date: '2024',
		highlight: t('Completion', 'Sertifikasi'),
		link: 'https://example.com/sql-cert',
	},
	{
		type: 'bootcamps',
		title: t('Brainware Internal Training', 'Bootcamp Internal Brainware'),
		issuer: t('Brainware of SMANSA', 'Brainware of SMANSA'),
		date: '2022 — 2023',
		highlight: t('Instructor & mentor', 'Instruktur & mentor'),
		link: 'https://www.instagram.com/brainwareofsmansa/',
	},
];

export const achievementTabs: AchievementTab[] = [
	{ id: 'competitions', name: t('Competitions', 'Kompetisi') },
	{ id: 'certifications', name: t('Certifications', 'Sertifikasi') },
	{ id: 'bootcamps', name: t('Bootcamps & Courses', 'Bootcamp & Kursus') },
];

export const projects: Project[] = [
	{
		title: t('Bioskopku CLI Ticketing', 'Bioskopku CLI Ticketing'),
		description: t(
			'CLI cinema ticketing in pure C with real-time validation and role-based controls, optimized for terminal workflows.',
			'Sistem tiket bioskop CLI berbasis C murni dengan validasi realtime dan kontrol berbasis peran, dioptimalkan untuk alur terminal.',
		),
		year: 2024,
		category: t('CLI Tool', 'CLI Tool'),
		categoryKey: 'cli',
		stack: ['C', 'Modular Architecture', 'CSV Storage'],
		highlights: [
			t('Modular, responsive seat management with clear structure.', 'Manajemen kursi modular dan mudah dibaca.'),
			t('Multi-role controls (admin, manager, staff, customer).', 'Kontrol multi-role (admin, manager, staff, customer).'),
			t('Auto scheduling, validation, and CSV reports.', 'Penjadwalan, validasi, dan laporan CSV otomatis.'),
		],
		link: { label: t('View repository', 'Lihat repositori'), url: 'https://github.com/riefproject/21IF1001-DDPFinalProject-Bioskopku' },
	},
	{
		title: t('Block Shooter — Raylib Game', 'Block Shooter — Raylib Game'),
		description: t(
			'Fast-paced arcade shooter in C + Raylib with power-ups and persistent high scores.',
			'Arcade shooter cepat dengan C + Raylib, lengkap dengan power-up dan high score persisten.',
		),
		year: 2024,
		category: t('Game Project', 'Proyek Gim'),
		categoryKey: 'game',
		stack: ['C', 'Raylib', 'Game Loop'],
		highlights: [
			t('Lightweight physics for responsive shooting.', 'Fisik ringan untuk tembakan yang responsif.'),
			t('11 difficulty tiers with steady pacing.', '11 level kesulitan dengan pacing bertahap.'),
			t('Local high-score board to track progress.', 'Papan high score lokal untuk memantau progres.'),
		],
		link: { label: t('View repository', 'Lihat repositori'), url: 'https://github.com/riefproject/21IF009-Project2-A5' },
	},
	{
		title: t('Riefmathics Statistics App', 'Riefmathics Statistics App'),
		description: t(
			'JavaScript web app that automates grouped and single data calculations with a tidy OOP structure.',
			'Aplikasi web JavaScript yang mengotomasi perhitungan data berkelompok dan tunggal dengan struktur OOP rapi.',
		),
		year: 2023,
		category: t('Web Application', 'Aplikasi Web'),
		categoryKey: 'web-app',
		stack: ['JavaScript', 'HTML/CSS', 'OOP'],
		highlights: [
			t('Handles grouped and single data smoothly.', 'Mengelola data berkelompok maupun tunggal dengan mulus.'),
			t('Pure JS—no external libraries required.', 'Murni JavaScript tanpa library eksternal.'),
			t('Fast, accurate, and easy to operate.', 'Cepat, akurat, dan mudah digunakan.'),
		],
		link: { label: t('Open app', 'Buka aplikasi'), url: 'https://riefproject.github.io/distributionTable-prerelease/' },
	},
	{
		title: t('Xcreeptor Encryption Suite', 'Xcreeptor Encryption Suite'),
		description: t(
			'Qt desktop app layering substitution ciphers, AES-256, and hashed storage for safer secrets.',
			'Aplikasi desktop Qt yang menggabungkan cipher substitusi, AES-256, dan penyimpanan ter-hash untuk keamanan data.',
		),
		year: 2023,
		category: t('Desktop App', 'Aplikasi Desktop'),
		categoryKey: 'desktop-app',
		stack: ['C++', 'Qt', 'AES-256'],
		highlights: [
			t('Clean UI so encryption feels approachable.', 'UI bersih agar enkripsi terasa mudah.'),
			t('Multi-layer security: substitution + AES + hashing.', 'Keamanan multilapis: substitusi + AES + hashing.'),
			t('Cross-platform build (Windows, Linux, macOS).', 'Build lintas platform (Windows, Linux, macOS).'),
		],
		link: { label: t('View repository', 'Lihat repositori'), url: 'https://github.com/riefproject/xcreeptor' },
	},
	{
		title: t('Competitive Programming Repository', 'Competitive Programming Repository'),
		description: t(
			'A living repository of solutions, notes, and templates from various judges.',
			'Repo hidup berisi solusi, catatan, dan template dari berbagai judge.',
		),
		year: 2021,
		category: t('Community & Learning', 'Komunitas & Pembelajaran'),
		categoryKey: 'community',
		stack: ['C++', 'Python', 'Problem Notes'],
		highlights: [
			t('Covers TLX, Codeforces, LeetCode, and more.', 'Mencakup TLX, Codeforces, LeetCode, dan lainnya.'),
			t('Clean, well-commented implementations you can reuse.', 'Implementasi bersih dengan komentar yang mudah digunakan ulang.'),
			t('Includes micro-challenges for mentees.', 'Memuat micro-challenge untuk mentee.'),
		],
		link: { label: t('View repository', 'Lihat repositori'), url: 'https://github.com/riefproject/Competitive-Programming' },
	},
];

export const contact: Contact = {
	email: 'talktorief@gmail.com',
	phone: '+62 812-0000-0000',
	message: t(
		'Have an idea or tricky problem? Let’s discuss and ship a solid solution.',
		'Punya ide atau masalah sulit? Yuk diskusikan dan eksekusi solusinya.',
	),
	availabilityNote: t(
		'I usually reply within 1–2 business days. Happy to jump on a quick call if needed.',
		'Biasanya membalas dalam 1–2 hari kerja. Siap untuk panggilan singkat jika perlu.',
	),
};
