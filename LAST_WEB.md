```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arief F-sa Wijaya | Portfolio</title>
    <link rel="stylesheet" href="src/css/style.css" />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="shortcut icon" href="src/img/logo.png" type="image/x-icon" />
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  </head>
  <body>
    <!-- Navigation -->
    <nav>
      <div class="navbar">
        <div class="logo">rief's portfolio</div>
        <button
          type="button"
          class="navbar-toggler collapsed"
          id="navbar-toggler"
          aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#exp">Experience</a></li>
          <li><a href="#exp-proj">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Home Section -->
    <section class="home fade-in" id="home">
      <div class="home-content">
        <div class="text">
          <div class="text-one">Hello! I am</div>
          <div class="text-two">Arief F-sa Wijaya</div>
          <div class="text-three">Student of D3 Informatics Engineering</div>
          <div class="text-four">Politeknik Negeri Bandung</div>
        </div>
        <div class="text">
          <br />
          <p>
            <a href="mailto:talktorief@gmail.com">
              <i class="bx bx-envelope"></i>
              talktorief@gmail.com
            </a>
          </p>
          <br />
          <p><i class="bx bx-map"></i>West Bandung, Indonesia</p>
          <br />
          <p>
            <a href="https://github.com/riefproject">
              <i class="bi bi-github"></i> riefproject
            </a>
          </p>
        </div>
      </div>
    </section>

    <hr style="margin: 0 5rem; border: 0.5px solid #2b65f8" />

    <!-- About Section -->
    <section class="about fade-in" id="about">
      <div class="content">
        <div class="title"><span>About Me</span></div>
        <div class="about-details">
          <div class="left">
            <img src="src/img/saya.png" alt="Profile Picture" />
          </div>
          <div class="right">
            <p>
              I am an aspiring innovator in information technology with a strong
              foundation in critical thinking and problem-solving, demonstrated
              through achievements in the National Science Olympiad (OSN) in
              Computer Science/Informatics, also known as the National Olympiad
              in Informatics (NOI) Indonesia. My passion lies in technology,
              particularly competitive programming (CP), which has sharpened my
              logical reasoning, algorithmic thinking, and problem-solving
              abilities.
            </p>
            <br />
            <p>
              I am especially interested in back-end development, where I enjoy
              working with logic, data structures, and data processing. My goal
              is to build efficient and scalable systems that ensure optimal
              application performance. Additionally, I am eager to explore web
              and mobile application development while staying up to date with
              the latest technologies to enhance product quality and user
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills fade-in" id="skills">
      <div class="content">
        <div class="title"><span>My Skills</span></div>
        <div class="skills-details">
          <div class="text">
            <p>
              I have a strong technical foundation, combining problem-solving
              skills, critical thinking, and leadership qualities. My expertise
              includes competitive programming, data structures, algorithms, and
              web development. I am passionate about building efficient and
              scalable solutions while continuously improving my knowledge in
              the latest technologies.
            </p>
            <p class="topic" style="margin-top: 2rem">Summary</p>
            <ul>
              <li>Problem Solving</li>
              <li>Critical Thinking</li>
              <li>Competitive Programming</li>
              <li>Data Structure & Algorithm</li>
              <li>Web Development</li>
              <li>Leadership</li>
            </ul>
          </div>
          <div class="boxes">
            <div class="box">
              <div class="per">10+</div>
              <div class="topic">
                Competitive Programming Contests (Including NOI Indonesia)
              </div>
            </div>
            <div class="box">
              <div class="per">300+</div>
              <div class="topic">
                Problems Solved (TLX, LeetCode, HackerRank, etc.)
              </div>
            </div>
            <div class="box">
              <div class="per">8+</div>
              <div class="topic">Programming Languages Experienced</div>
            </div>
            <div class="box">
              <div class="per">10+</div>
              <div class="topic">Projects Completed/Ongoing</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="fade-in" id="edu">
      <div class="timeline-container">
        <div class="title"><span>Educational Background</span></div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-date">2021 - 2024</div>
            <div class="timeline-content">
              <div>
                <img
                  src="src/img/smansa.png"
                  alt="SMA Negeri 1 Subang Logo"
                  style="height: calc(1em + 1rem + 1em)" />
              </div>
              <div style="margin-left: 1rem">
                <h3>SMA Negeri 1 Subang</h3>
                <p>Mathematics and Natural Sciences</p>
              </div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2024 - Present</div>
            <div class="timeline-content">
              <div>
                <img
                  src="src/img/polban.png"
                  alt="Politeknik Negeri Bandung Logo"
                  style="height: calc(1em + 1rem + 1em)" />
              </div>
              <div style="margin-left: 1rem">
                <h3>Politeknik Negeri Bandung</h3>
                <p>D3 Informatics Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="exp" class="exp fade-in">
      <div class="content">
        <div class="title"><span>Experience</span></div>
        <div class="exp-details">
          <div class="left">
            <img src="src/img/biossmansa.png" alt="BIoS Logo" />
          </div>
          <div class="right">
            <p class="topic">
              Head of Programming Division, Brainware of SMANSA
            </p>
            <p>(Computer Club of SMA Negeri 1 Subang)</p>
            <p>Term: 2022-2023</p>
            <ul>
              <li>
                Led and coordinated programming activities and projects,
                fostering a collaborative learning environment.
              </li>

              <li>
                Designed and implemented structured training programs for new
                members, covering fundamental to advanced programming concepts.
              </li>

              <li>
                Organized and presented programming projects at school events to
                encourage innovation and problem-solving.
              </li>

              <li>
                Provided mentorship and guidance to club members, enhancing
                their technical and competitive programming skills.
              </li>

              <li>
                Trained and coached juniors for programming competitions,
                helping them improve algorithmic thinking and coding efficiency.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div style="background-color: #f0f8ff !important">
      <!-- Achievements Section -->
      <section id="ach" class="ach fade-in">
        <div class="content">
          <div class="title"><span>Achievements</span></div>
          <div class="ach-details">
            <div class="left">
              <img src="src/img/osn.png" alt="OSN Logo" />
            </div>
            <div class="right">
              <p class="topic">National Science Olympiad</p>
              <div>
                <p style="text-align: start">
                  Field: Computer Science/Informatics
                </p>
                <br />
                <p style="text-align: start">
                  Organizer: National Achievement Center (Puspresnas)
                </p>
              </div>
              <br />
              <p>
                The National Science Olympiad (OSN) in Informatics, also known
                as the National Olympiad in Informatics (NOI) Indonesia is a
                prestigious annual competition in Indonesia aimed at discovering
                and nurturing young talents in algorithms and programming.
                Participants are tested on algorithm design, problem-solving,
                and advanced programming skills.
              </p>
              <p>2022: District Champion</p>
              <p>2022: Provincial Participant</p>
              <p>2023: District Participant</p>
            </div>
          </div>
        </div>
      </section>

      <hr style="margin: 0 5rem; border: 0.5px solid #2b65f8" />
      <!-- Project Experience Section -->
      <section class="exp-proj fade-in" id="exp-proj">
        <div class="content">
          <div class="title"><span>Project Experience</span></div>
          <div class="repo-cards">
            <div class="repo-card">
              <div
                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                ">
                <h3 style="margin-bottom: 1rem">
                  🎬 Bioskopku: A CLI-Based Cinema Ticketing System in C
                </h3>
                <div class="description">
                  <p style="margin-bottom: 1rem">
                    A lightweight and efficient command-line cinema ticket
                    booking system built entirely in C! Featuring real-time seat
                    validation, multi-role management, and CSV-based storage, it
                    offers a modern yet minimalistic approach to theater
                    operations.
                  </p>
                  <ul class="emoji-list">
                    <li>
                      <span class="emoji"> ⚡</span
                      ><span class="text"> Fast & modular architecture</span>
                    </li>
                    <li>
                      <span class="emoji"> 👤</span
                      ><span class="text">
                        Multi-role support (Admin, Manager,
                        Staff,Customer)</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 📅</span
                      ><span class="text">
                        Automated scheduling & seat validation</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 📊</span
                      ><span class="text"> Detailed revenue reporting</span>
                    </li>
                    <li>
                      <span class="emoji"> 💾</span
                      ><span class="text">
                        CSV-based data storage (no database needed!)</span
                      >
                    </li>
                  </ul>
                </div>
                <a
                  href="https://github.com/riefproject/21IF1001-DDPFinalProject-Bioskopku"
                  class="btn btn-primary"
                  style="
                                        text-decoration: none;
                                        padding: 0.5rem 1rem;
                                        background-color: #4070f4;
                                        color: white;
                                        border-radius: 5px;
                                    "
                  >View Repo</a
                >
              </div>
            </div>
            <div class="repo-card">
              <div
                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                ">
                <h3 style="margin-bottom: 1rem">
                  🚀 Block Shooter: A Pure C Arcade Shooter
                </h3>
                <div class="description">
                  <p style="margin-bottom: 1rem">
                    A fast-paced block shooter built entirely in C, powered by
                    the Raylib game framework! Test your reflexes across 11
                    difficulty levels, master power-ups, and climb the
                    high-score leaderboard.
                  </p>
                  <ul class="emoji-list">
                    <li>
                      <span class="emoji"> 🛠️</span
                      ><span class="text"> Built 100% in C with Raylib</span>
                    </li>
                    <li>
                      <span class="emoji"> 🎯</span
                      ><span class="text">
                        Physics-based shooting mechanics</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 🔥</span
                      ><span class="text">
                        Power-ups & progressive difficulty</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 🏆</span
                      ><span class="text">
                        High-score system with persistent storage</span
                      >
                    </li>
                  </ul>
                </div>
                <a
                  href="https://github.com/riefproject/21IF009-Project2-A5"
                  class="btn btn-primary"
                  style="
                                        text-decoration: none;
                                        padding: 0.5rem 1rem;
                                        background-color: #4070f4;
                                        color: white;
                                        border-radius: 5px;
                                    "
                  >View Repo</a
                >
              </div>
            </div>
            <div class="repo-card">
              <div
                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                ">
                <h3 style="margin-bottom: 1rem">
                  📊 Riefmathics: A Web App for Automated Statistical
                  Calculations
                </h3>
                <div class="description">
                  <p style="margin-bottom: 1rem">
                    A powerful JavaScript-based web application designed to
                    automate statistical data computations. Built with
                    Object-Oriented Programming (OOP) for modularity and
                    efficiency.
                  </p>
                  <ul class="emoji-list">
                    <li>
                      <span class="emoji"> ✅</span
                      ><span class="text">
                        Supports Grouped & Single Data calculations</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> ⚡</span
                      ><span class="text">
                        Built with pure JavaScript (no libraries
                        required!)</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 📈</span
                      ><span class="text">
                        Fast, accurate, and user-friendly</span
                      >
                    </li>
                  </ul>
                </div>
                <div
                  class="buttons"
                  style="
                                        display: flex;
                                        gap: 1rem;
                                        width: 100%;
                                    ">
                  <a
                    href="https://riefproject.github.io/distributionTable-prerelease/web/src/html/groupedData.html"
                    class="btn btn-primary"
                    style="
                                            text-decoration: none;
                                            padding: 0.5rem 1rem;
                                            background-color: #4070f4;
                                            color: white;
                                            border-radius: 5px;
                                        "
                    >Grouped Data</a
                  >
                  <a
                    href="https://riefproject.github.io/distributionTable-prerelease/web/src/html/singleData.html"
                    class="btn btn-primary"
                    style="
                                            text-decoration: none;
                                            padding: 0.5rem 1rem;
                                            background-color: #4070f4;
                                            color: white;
                                            border-radius: 5px;
                                        "
                    >Single Data</a
                  >
                </div>
              </div>
            </div>
            <div class="repo-card">
              <div
                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                ">
                <h3 style="margin-bottom: 1rem">
                  🔐 Xcreeptor: A Qt-Based Multi-Layer Encryption App
                </h3>
                <div class="description">
                  <p style="margin-bottom: 1rem">
                    A C++ & Qt-powered encryption tool that combines
                    substitution ciphers, AES-256 encryption, and secure local
                    database storage with multi-layered encryption & hashing for
                    ultimate data protection.
                  </p>
                  <ul class="emoji-list">
                    <li>
                      <span class="emoji"> ✅</span
                      ><span class="text">
                        Secure & User-Friendly Interface</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 🔑</span
                      ><span class="text">
                        Advanced Encryption: Substitution Cipher + AES-256 +
                        Hashed .dat Storage</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 🛡️</span
                      ><span class="text">
                        Account & Key Management with SHA-256
                        Authentication</span
                      >
                    </li>
                    <li>
                      <span class="emoji"> 💡</span
                      ><span class="text">
                        Cross-Platform Support (Windows, Linux, macOS)</span
                      >
                    </li>
                  </ul>
                </div>
                <a
                  href="https://github.com/riefproject/xcreeptor"
                  class="btn btn-primary"
                  style="
                                        text-decoration: none;
                                        padding: 0.5rem 1rem;
                                        background-color: #4070f4;
                                        color: white;
                                        border-radius: 5px;
                                    "
                  >View Repo</a
                >
              </div>
            </div>
            <div class="repo-card">
              <div
                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                ">
                <h3 style="margin-bottom: 1rem">
                  🚀 Competitive Programming Enthusiast
                </h3>
                <div class="description">
                  <p style="margin-bottom: 1rem">
                    Actively solving problems on LeetCode, TLX, Codeforces, and
                    HackerRank using C++, JavaScript, C, and more. Enjoy
                    tackling challenges, optimizing solutions, and continuously
                    improving problem-solving skills.
                  </p>
                  <ul class="emoji-list">
                    <li>
                      <span class="emoji">⚡</span>
                      <span class="text"
                        >Passionate about efficiency and elegantsolutions
                      </span>
                    </li>
                    <li>
                      <span class="emoji">🏆</span>
                      <span class="text"
                        >Enjoys competitions and time-constrainedproblem-solving
                      </span>
                    </li>
                    <li>
                      <span class="emoji">💡</span>
                      <span class="text"
                        >Always exploring new problem-solvingtechniques across
                        multiple languages
                      </span>
                    </li>
                  </ul>
                </div>
                <a
                  href="https://github.com/riefproject/Competitive-Programming"
                  class="btn btn-primary"
                  style="
                                        text-decoration: none;
                                        padding: 0.5rem 1rem;
                                        background-color: #4070f4;
                                        color: white;
                                        border-radius: 5px;
                                    "
                  >View Repo</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Contact Section -->
    <section class="contact fade-in" id="contact">
      <div class="content">
        <div class="title"><span>Let's Talk</span></div>
        <div class="contact-container">
          <div class="contact-info">
            <p>
              Got an exciting idea or a big project in mind? Let's collaborate
              and turn it into something amazing! I'm open to discussions and
              ready to help!
            </p>
            <div class="social-links">
              <h3>🌍 Connect with Me</h3>
              <a href="https://instagram.com/fsarf_" title="Instagram"
                ><i class="bx bxl-instagram"></i
              ></a>
              <a href="https://github.com/riefproject" title="Github"
                ><i class="bx bxl-github"></i
              ></a>
              <a
                href="https://linkedin.com/in/arief-f-sa-wijaya-9aa935319"
                title="LinkedIn"
                ><i class="bx bxl-linkedin"></i
              ></a>
              <a href="mailto:talktorief@gmail.com" title="Gmail"
                ><i class="bx bxl-gmail"></i
              ></a>
            </div>
          </div>

          <div class="contact-form">
            <form action="https://formspree.io/f/mzzeavab" method="POST">
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required />
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                style="
                                    width: 100%;
                                    min-height: 50px;
                                    max-height: 100px;
                                    resize: vertical;
                                "
                required></textarea>
              <div class="captcha">
                <div
                  class="h-captcha"
                  data-sitekey="3d4a7fe6-28a0-4732-ba4e-5f1cdae2a9f2"></div>
              </div>
              <button type="submit">Kirim</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="text">
        <span
          >Created by: <strong>riefproject</strong>. &#169;
          <span id="stamp"></span
        ></span>
      </div>
    </footer>

    <script src="src/js/script.js"></script>
  </body>
</html>
```

```css
/* Google Font CDN Link */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&display=swap");

/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  scroll-behavior: smooth;
}
body::-webkit-scrollbar {
  width: 8px;
}
body::-webkit-scrollbar-thumb {
  background-color: #4070f4;
  border-radius: 4px;
}
html {
  scroll-behavior: smooth;
}

input::placeholder,
textarea::placeholder {
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  color: #999;
}

input,
textarea {
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  color: #333;
}
/* Button */
.btn {
  display: inline-block;
  font-weight: 400;
  color: #fff;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  background-color: #0d6efd;
  border: 1px solid #0d6efd;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
}

.btn:hover {
  background-color: #0b5ed7;
  border-color: #0b5ed7;
}
/* navbar */
nav {
  position: fixed;
  width: 100%;
  padding: 20px 0;
  z-index: 998;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
}
nav.sticky {
  background: #4070f4;
  padding: 13px 0;
}
nav .navbar {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
nav .navbar .logo {
  font-weight: 500;
  font-size: 24px;
  color: #4070f4;
  font-family: "Ubuntu", sans-serif;
}
nav.sticky .navbar .logo {
  color: #fff;
  font-size: 24px;
}
/* home */
.home {
  height: 100vh;
  width: 100%;
  font-family: "Ubuntu", sans-serif;
}
.home .home-content {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home .text-one {
  font-size: 25px;
  color: #0e2431;
}
.home .text-two {
  color: #0e2431;
  font-size: 75px;
  font-weight: 600;
  margin-left: -3px;
}
.home .text-three {
  font-size: 40px;
  margin: 5px 0;
  color: #4070f4;
}
.home .text-four {
  font-size: 23px;
  margin: 5px 0;
  color: #0e2431;
}
.home .home-content .text ul li {
  margin-top: 1rem;
}
/* Section */
section {
  padding-top: 40px;
}
section .content {
  width: 80%;
  margin: 40px auto;
  font-family: "Poppins", sans-serif;
}
section .title {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
section .title span {
  color: #0e2431;
  font-size: 30px;
  font-weight: 600;
  position: relative;
  padding-bottom: 8px;
}
section .title span::before,
section .title span::after {
  content: "";
  position: absolute;
  height: 3px;
  width: 100%;
  background: #4070f4;
  left: 0;
  bottom: 0;
}
section .title span::after {
  bottom: -7px;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
}

/* About me */
.about .about-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.about .about-details .left {
  width: 45%;
}
.about .left img {
  height: 400px;
  width: 400px;
  object-fit: cover;
  border-radius: 12px;
}
.about-details .right {
  width: 55%;
}
section .topic {
  color: #0e2431;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}
.about-details .right p {
  text-align: justify;
  color: #0e2431;
}

/* Skills */
.skills {
  background: #f0f8ff;
}
.skills .content {
  padding: 40px 0;
}
.skills .skills-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.skills-details .text {
  width: 50%;
}
.skills-details p {
  color: #0e2431;
  text-align: justify;
}
/* .skills-details .boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
} */
.skills-details .boxes {
  width: 45%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  gap: 20px; /* Jarak antar elemen */
}

.skills-details .box {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
}

.skills-details .box .per {
  font-size: 60px;
  /* font-weight: bold; */
  color: #4070f4;
}

.skills-details .box .topic {
  font-size: 1rem;
  color: #4070f4;
  margin-top: 10px;
}
.skills-details li {
  margin-inline-start: 1.2rem;
  margin-inline-end: 0px;
}
/* Timeline */
.timeline-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  padding-bottom: 3rem;
}
.timeline-container h3 {
  font-weight: 600;
}
.timeline {
  position: relative;
  padding: 20px 0;
  border-left: 3px solid #4070f4;
}

.timeline-item {
  margin-bottom: 20px;
  padding-left: 20px;
  position: relative;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -0.5rem;
  top: 0.15rem;
  width: 15px;
  height: 15px;
  background-color: #4070f4;
  border-radius: 50%;
}

.timeline-date {
  font-weight: 500;
  color: #4070f4;
}

.timeline-content {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: start;
  align-items: center;
}

.ach .ach-details,
.exp .exp-details,
.exp-design .exp-design-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ach .ach-details .left,
.exp .exp-details .left,
.exp-design .exp-design-details .left {
  width: 25%;
}
.ach .left img,
.exp .left img,
.exp-design .left img {
  height: 200px;
  width: 200px;
  border-radius: 12px;
}
.ach-details .right,
.exp-design-details .right,
.exp-details .right {
  width: 75%;
}
.exp ul li,
.ach p {
  text-align: justify;
}
.ach {
  background: #f0f8ff;
  padding-bottom: 3rem;
}
/* Contact Me*/
.contact {
  background: #f0f8ff;
}
.contact .content {
  margin: 0 auto;
  padding: 30px 0;
}
.contact .text {
  width: 80%;
  text-align: center;
  margin: auto;
}
.contact p {
  padding-top: 1rem;
}
.home a,
.contact a {
  text-decoration: none;
  color: #000000;
}

/* exp-proj */
.exp-proj {
  background: #f0f8ff;
  text-align: justify;
}
.exp-proj .content {
  margin: 0 auto;
  padding: 30px 0;
}
.exp-proj .text {
  width: 80%;
  text-align: center;
  margin: auto;
}
.exp-proj p {
  padding-top: 1rem;
}
.home a,
.exp-proj a {
  text-decoration: none;
  color: #000000;
}

/* Footer */
footer {
  background: #4070f4;
  padding: 15px 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
}
footer .text span {
  font-size: 17px;
  font-weight: 400;
  color: #fff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px; /* Adjust the distance from the text */
  width: 0;
  height: 2px;
  background-color: #0b5ed7;
  transition: width 0.3s ease-in-out;
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-toggle.active {
  transform: rotate(90deg);
}

.repo-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
}
.repo-card .description {
  min-height: 20rem;
}

.repo-card {
  background-color: #f9f9f927;
  border: 0.5px solid #4070f4;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

.repo-card h3 {
  font-size: 1.25rem;
  color: #4070f4;
  text-align: start;
  min-height: 4rem;
}

.repo-card p {
  font-size: 0.95rem;
  color: #000;
  line-height: 1.5;
  flex-grow: 1;
  margin-bottom: auto;
}

.repo-card a {
  color: #4070f4;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background-color: #4070f4;
  color: white;
  border-radius: 5px;
  display: inline-block;
  margin-top: 1rem;
  align-self: flex-start;
}

.repo-card a:hover {
  background-color: #3058c5;
}

.repo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.emoji-list {
  list-style: none;
  padding-left: 0;
}

.emoji-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-align: start;
}

.emoji {
  width: 1.5em;
  flex-shrink: 0;
}

.emoji-list .text {
  flex: 1;
  text-align: start;
}
.contact {
  background: linear-gradient(135deg, #e0f7fa, #fce4ec);
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.contact .content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact .title {
  font-size: 2rem;
  font-weight: bold;
  color: #4070f4;
  margin-bottom: 2rem;
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.contact-info {
  flex: 1;
  max-width: 400px;
  text-align: left;
}

.contact-info p {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.contact-info h3 {
  font-size: 1.25rem;
  color: #4070f4;
  margin-bottom: 1rem;
}

.contact-info a {
  color: #4070f4;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.social-links a {
  font-size: 1.5rem;
  color: #4070f4;
  margin-right: 1rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #3058c5;
}

.contact-form {
  flex: 1;
  max-width: 400px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #4070f4;
  outline: none;
}

.contact-form button {
  padding: 0.75rem;
  background: #4070f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.contact-form button:hover {
  background: #3058c5;
}

.captcha {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}
/* Navbar toggler animation */
.navbar-toggler {
  border: none;
  background: transparent;
  position: relative;
  width: 24px;
  height: 18px;
  cursor: pointer;
  display: none;
}

.navbar-toggler span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #4070f4 !important;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.navbar-toggler span:nth-child(1) {
  top: 0px;
}

.navbar-toggler span:nth-child(2),
.navbar-toggler span:nth-child(3) {
  top: 7px;
}

.navbar-toggler span:nth-child(4) {
  top: 14px;
}

.navbar-toggler.collapsed span:nth-child(1) {
  top: 0px;
  transform: rotate(0deg);
}

.navbar-toggler.collapsed span:nth-child(2),
.navbar-toggler.collapsed span:nth-child(3) {
  top: 7px;
  opacity: 1;
  left: 0;
}

.navbar-toggler.collapsed span:nth-child(4) {
  top: 14px;
  transform: rotate(0deg);
}

.navbar-toggler:not(.collapsed) span:nth-child(1) {
  top: 7px;
  transform: rotate(135deg);
}

.navbar-toggler:not(.collapsed) span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.navbar-toggler:not(.collapsed) span:nth-child(3) {
  opacity: 0;
  left: 60px;
}

.navbar-toggler:not(.collapsed) span:nth-child(4) {
  top: 7px;
  transform: rotate(-135deg);
}

/* ============= Responsive Design ============= */
@media (max-width: 1000px) {
}

@media (max-width: 900px) {
  .about .left img {
    margin-left: 0;
    height: 350px;
    width: 350px;
  }
  .ach .left img,
  .exp .right img {
    height: 150px;
    width: 150px;
  }
}

@media (max-width: 1200px) {
  nav .navbar {
    width: 90%;
  }
  .home .text-two {
    font-size: 65px;
  }
  .home .text-three {
    font-size: 35px;
  }
  .skills .skills-details {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .skills-details .text {
    width: 100%;
    margin-bottom: 50px;
  }
  .skills-details .boxes {
    width: 100%;
    grid-template-columns: repeat(2, 1fr); /* Tetap 2 kolom di mobile */
    gap: 15px;
    justify-content: center;
  }

  .skills-details .box .per {
    font-size: 50px; /* Ukuran angka lebih kecil di mobile */
  }

  .skills-details .box .topic {
    font-size: 0.9rem; /* Ukuran teks lebih kecil di mobile */
  }
  .contact .text {
    width: 100%;
  }
  .exp-proj .text {
    width: 100%;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    background-color: #4070f4;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }
  .nav-links.active {
    display: flex;
  }
  .menu-toggle {
    display: block;
  }
  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .nav-links.active {
    display: flex;
  }
  .nav-links li {
    margin: 1.5rem 0;
    opacity: 0;
    transform: translateY(20px);
    animation: slideIn 0.5s forwards;
  }
  .nav-links li a {
    color: white;
    font-size: 1rem;
    font-weight: 500;
  }
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .navbar-toggler {
    display: block;
    z-index: 1001;
  }
  .navbar-toggler.active span {
    background-color: white !important;
  }
  .contact-container {
    flex-direction: column;
    align-items: center;
  }
  .contact-info,
  .contact-form {
    max-width: 100%;
  }
  .repo-cards {
    grid-template-columns: 1fr;
  }
  .repo-card {
    padding: 1rem;
  }
  .repo-card h3 {
    font-size: 1.1rem;
  }
  .repo-card p {
    font-size: 0.9rem;
  }
  .about .about-details,
  .ach .ach-details,
  .exp .exp-details {
    justify-content: center;
    flex-direction: column;
  }
  .about .about-details .left,
  .ach .ach-details .left,
  .exp .exp-details .left {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .about-details .right,
  .ach-details .right,
  .exp-details .right {
    width: 90%;
    margin: 40px 0;
  }
}

@media (max-width: 500px) {
  .home .text-two {
    font-size: 55px;
  }
  .home .text-three {
    font-size: 33px;
  }
  .skills-details .boxes .per {
    font-size: 50px;
    color: #4070f4;
  }
  .skills-details .boxes .box {
    margin-left: 1rem;
  }
}

@media (max-width: 480px) {
  .repo-card {
    padding: 0.75rem;
  }
  .repo-card h3 {
    font-size: 1rem;
  }
  .repo-card p {
    font-size: 0.85rem;
  }
  .repo-card a {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    font-size: 0.7rem;
  }
  .buttons {
    flex-direction: column;
    align-items: center;
  }
  .description ul li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #333;
    line-height: 1.5;
  }
  .btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: #fff;
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .buttons a {
    margin: 0;
  }
  .btn-primary:hover {
    background-color: #0b5ed7;
    border-color: #0b5ed7;
  }
  .repo-card a:hover {
    background-color: #2048a3;
  }
  .contact-form {
    width: 90%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .contact-container {
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
  }

  .contact-form textarea {
    max-height: 150px; /* Prevent textarea from growing too large */
  }
  .captcha {
    display: flex;
    justify-content: center;
  }
  .h-captcha {
    transform: scale(0.65); /* Adjust width dynamically to match other inputs */
    transform-origin: center; /* Align scaling to the left */
  }

  .contact-form button {
    width: 100%; /* Ensure button spans full width */
  }
}

@media (min-width: 769px) {
  .navbar-toggler {
    display: none;
  }
  .nav-links {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    background: none;
    position: static;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
  }
  .nav-links li {
    margin: 0;
  }
  .nav-links a {
    color: #fff;
    font-size: 1.2rem; /* Adjusted font size */
    font-weight: 500;
  }
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```js
window.onload = function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.08) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: [0.05, 0.1, 0.2, 0.5, 1] }
  );

  elements.forEach((el) => observer.observe(el));
};

// Sticky Navigation
let nav = document.querySelector("nav");
let navLogo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  navLogo.style.color = "#4070f4";
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    nav.style.backdropFilter = "blur(10px)";
    nav.style.webkitBackdropFilter = "blur(10px)";
    nav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  } else {
    nav.classList.remove("sticky");
    nav.style.backgroundColor = "transparent";
    nav.style.backdropFilter = "none";
    nav.style.webkitBackdropFilter = "none";
    nav.style.boxShadow = "none";
  }
});

// Mobile Menu Toggle
const navLinks = document.querySelector(".nav-links");
const navbarToggler = document.getElementById("navbar-toggler");

navbarToggler.addEventListener("click", () => {
  // Toggle menu button animation
  navbarToggler.classList.toggle("collapsed");

  // Toggle navigation menu
  navLinks.classList.toggle("active");

  // Prevent scrolling when menu is open
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "auto";

  // Add animation delay to each nav item
  const navItems = document.querySelectorAll(".nav-links li");
  navItems.forEach((item, index) => {
    if (navLinks.classList.contains("active")) {
      item.style.animationDelay = `${index * 0.1}s`;
    } else {
      item.style.animationDelay = "0s";
    }
  });
});

// Close menu when clicking nav links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbarToggler.classList.add("collapsed");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Contact Form Validation
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    const captchaCheckbox = document.getElementById("human-check");
    if (!captchaCheckbox.checked) {
      e.preventDefault();
      alert("Please confirm you are human by checking the captcha box.");
    }
  });

// Set initial nav-link color before scroll
document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.style.color = "#4070f4";
});

// Dynamically update the year in the footer
document.addEventListener("DOMContentLoaded", () => {
  const stampElement = document.getElementById("stamp");
  if (stampElement) {
    stampElement.textContent = new Date().getFullYear();
  }
});
```
