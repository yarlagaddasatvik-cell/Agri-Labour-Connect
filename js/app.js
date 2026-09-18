// ==========================================================================
// AGRI LABOUR CONNECT - MAIN APPLICATION SCRIPT
// ==========================================================================

const App = {
  currentLang: 'en', // 'en' or 'te'
  currentRole: 'farmer', // 'farmer' or 'labourer'
  workerFilter: 'all',
  workerSort: 'rating',

  // Local Storage Data Holders
  workers: [],
  jobs: [],
  reviews: [],

  init() {
    this.loadStorageData();
    this.populateLocationDropdowns();
    this.setupEventListeners();
    this.renderWageTable();
    this.renderCalendar();
    this.renderReviews();
    this.calculateLabourCost();
    this.renderWorkers();
    this.renderJobs();
    this.applyLanguage(this.currentLang);
  },

  // Load from localStorage or fallback to initial data
  loadStorageData() {
    const storedWorkers = localStorage.getItem('agri_workers');
    this.workers = storedWorkers ? JSON.parse(storedWorkers) : [...INITIAL_WORKERS];

    const storedJobs = localStorage.getItem('agri_jobs');
    this.jobs = storedJobs ? JSON.parse(storedJobs) : [...INITIAL_JOBS];

    const storedReviews = localStorage.getItem('agri_reviews');
    this.reviews = storedReviews ? JSON.parse(storedReviews) : [...INITIAL_REVIEWS];
  },

  saveWorkers() {
    localStorage.setItem('agri_workers', JSON.stringify(this.workers));
  },

  saveJobs() {
    localStorage.setItem('agri_jobs', JSON.stringify(this.jobs));
  },

  saveReviews() {
    localStorage.setItem('agri_reviews', JSON.stringify(this.reviews));
  },

  // Setup cascading district/mandal/village selects
  populateLocationDropdowns() {
    const districtSelects = [
      document.getElementById('search-district'),
      document.getElementById('farmer-district'),
      document.getElementById('worker-district'),
      document.getElementById('job-district')
    ];

    const districts = Object.keys(LOCATIONS_DATA);

    districtSelects.forEach(select => {
      if (!select) return;
      // keep first placeholder option
      const firstOpt = select.options[0];
      select.innerHTML = '';
      select.appendChild(firstOpt);

      districts.forEach(dist => {
        const opt = document.createElement('option');
        opt.value = dist;
        opt.textContent = `${dist}`;
        select.appendChild(opt);
      });
    });
  },

  // Event Listeners setup
  setupEventListeners() {
    // Language Toggle
    const btnLang = document.getElementById('btn-lang-toggle');
    if (btnLang) {
      btnLang.addEventListener('click', () => {
        const newLang = this.currentLang === 'en' ? 'te' : 'en';
        this.applyLanguage(newLang);
      });
    }

    // Role Switchers
    const roleFarmer = document.getElementById('role-farmer-btn');
    const roleLabour = document.getElementById('role-labour-btn');

    if (roleFarmer) {
      roleFarmer.addEventListener('click', () => {
        this.setRole('farmer');
        document.getElementById('find-workers').scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (roleLabour) {
      roleLabour.addEventListener('click', () => {
        this.setRole('labourer');
        document.getElementById('job-board').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
      });
    }

    // Cascading location for Search Card
    const searchDistrict = document.getElementById('search-district');
    const searchMandal = document.getElementById('search-mandal');
    const searchVillage = document.getElementById('search-village');

    if (searchDistrict) {
      searchDistrict.addEventListener('change', (e) => {
        const dist = e.target.value;
        searchMandal.innerHTML = '<option value="">All Mandals (అన్ని మండలాలు)</option>';
        searchVillage.innerHTML = '<option value="">All Villages (అన్ని గ్రామాలు)</option>';

        if (dist && LOCATIONS_DATA[dist]) {
          searchMandal.disabled = false;
          Object.keys(LOCATIONS_DATA[dist]).forEach(mandal => {
            const opt = document.createElement('option');
            opt.value = mandal;
            opt.textContent = mandal;
            searchMandal.appendChild(opt);
          });
        } else {
          searchMandal.disabled = true;
          searchVillage.disabled = true;
        }
        this.filterWorkers();
      });
    }

    if (searchMandal) {
      searchMandal.addEventListener('change', (e) => {
        const dist = searchDistrict.value;
        const mandal = e.target.value;
        searchVillage.innerHTML = '<option value="">All Villages (అన్ని గ్రామాలు)</option>';

        if (dist && mandal && LOCATIONS_DATA[dist] && LOCATIONS_DATA[dist][mandal]) {
          searchVillage.disabled = false;
          LOCATIONS_DATA[dist][mandal].forEach(village => {
            const opt = document.createElement('option');
            opt.value = village;
            opt.textContent = village;
            searchVillage.appendChild(opt);
          });
        } else {
          searchVillage.disabled = true;
        }
        this.filterWorkers();
      });
    }

    if (searchVillage) {
      searchVillage.addEventListener('change', () => this.filterWorkers());
    }

    // Reset Filters button
    const btnReset = document.getElementById('btn-reset-filters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        document.getElementById('search-workers-form').reset();
        searchMandal.disabled = true;
        searchVillage.disabled = true;
        this.workerFilter = 'all';
        this.updateFilterPillsUI();
        this.renderWorkers();
      });
    }

    // Work Type change in search
    const searchWorkType = document.getElementById('search-work-type');
    if (searchWorkType) {
      searchWorkType.addEventListener('change', () => this.filterWorkers());
    }

    const searchCount = document.getElementById('search-worker-count');
    if (searchCount) {
      searchCount.addEventListener('input', () => this.filterWorkers());
    }

    // Filter pills
    const filterPills = document.querySelectorAll('#worker-filter-pills .pill-btn');
    filterPills.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterPills.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.workerFilter = e.target.dataset.filter;
        this.filterWorkers();
      });
    });

    // Sort select
    const sortSelect = document.getElementById('worker-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.workerSort = e.target.value;
        this.filterWorkers();
      });
    }

    // Cost Estimator Inputs
    const calcWork = document.getElementById('calc-work-type');
    const calcWorkers = document.getElementById('calc-workers');
    const calcDays = document.getElementById('calc-days');

    [calcWork, calcWorkers, calcDays].forEach(input => {
      if (input) {
        input.addEventListener('input', () => this.calculateLabourCost());
      }
    });

    // Modal Triggers
    this.setupModalTrigger('btn-open-post-job', 'modal-post-job');
    this.setupModalTrigger('btn-post-job-top', 'modal-post-job');
    this.setupModalTrigger('btn-open-labour-reg', 'modal-labour-reg');
    this.setupModalTrigger('btn-register-labour-top', 'modal-labour-reg');
    this.setupModalTrigger('btn-open-emergency-sos', 'modal-emergency-sos');
    this.setupModalTrigger('fab-sos-btn', 'modal-emergency-sos');
    this.setupModalTrigger('btn-open-review-modal', 'modal-review');

    // Close Modal triggers
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        this.closeModal(modalId);
      });
    });

    // Close modal on background click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Form Submissions
    this.setupFormSubmissions();
  },

  setupModalTrigger(buttonId, modalId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener('click', () => this.openModal(modalId));
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  },

  setRole(role) {
    this.currentRole = role;
    const t = TRANSLATIONS[this.currentLang];
    this.showToast(`Switched view to ${role === 'farmer' ? 'Farmer Mode 👨‍🌾' : 'Labourer Mode 👷'}`);
  },

  updateFilterPillsUI() {
    const filterPills = document.querySelectorAll('#worker-filter-pills .pill-btn');
    filterPills.forEach(b => {
      if (b.dataset.filter === this.workerFilter) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  },

  // Form Submissions with localStorage
  setupFormSubmissions() {
    // Farmer Registration Form
    const farmerForm = document.getElementById('farmer-reg-form');
    if (farmerForm) {
      farmerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = TRANSLATIONS[this.currentLang];
        this.closeModal('modal-farmer-reg');
        this.showToast(t.toastJobPosted || "Farmer profile registered successfully!");
        farmerForm.reset();
      });
    }

    // Labourer Registration Form
    const labourForm = document.getElementById('labour-reg-form');
    if (labourForm) {
      labourForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = TRANSLATIONS[this.currentLang];
        const name = document.getElementById('worker-name').value.trim();
        const phone = document.getElementById('worker-phone').value.trim();
        const type = document.getElementById('worker-type-select').value;
        const groupSize = parseInt(document.getElementById('worker-group-size').value) || 1;
        const district = document.getElementById('worker-district').value;
        const mandal = document.getElementById('worker-mandal').value.trim();
        const village = document.getElementById('worker-village').value.trim();
        const dailyWage = parseInt(document.getElementById('worker-wage').value) || 600;
        const experience = document.getElementById('worker-exp').value.trim() || '5 Years';

        const checkedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);

        const newWorker = {
          id: 'w_' + Date.now(),
          name_en: name,
          name_te: name,
          type: type,
          groupSize: type === 'group' ? groupSize : 1,
          district: district,
          mandal: mandal,
          village: village,
          skills: checkedSkills.length > 0 ? checkedSkills : ['harvesting'],
          skills_labels_en: checkedSkills.map(s => s.toUpperCase()),
          skills_labels_te: checkedSkills.map(s => s.toUpperCase()),
          dailyWage: dailyWage,
          experience: experience,
          rating: 5.0,
          reviewsCount: 1,
          status: 'available',
          phone: `+91 ${phone}`,
          whatsapp: `91${phone}`,
          avatar: type === 'group' 
            ? 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          verified: true,
          availableDates: ["2026-09-19", "2026-09-20", "2026-09-21"],
          equipment: ["Standard farm tools"],
          bio_en: `Experienced agricultural labour in ${mandal}, ${district}.`,
          bio_te: `${district} జిల్లా ${mandal} గ్రామంలో అనుభవజ్ఞులైన శ్రామికులు.`
        };

        this.workers.unshift(newWorker);
        this.saveWorkers();
        this.closeModal('modal-labour-reg');
        this.renderWorkers();
        this.showToast(t.toastWorkerAdded);
        labourForm.reset();

        document.getElementById('find-workers').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Post Job Form
    const postJobForm = document.getElementById('post-job-form');
    if (postJobForm) {
      postJobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = TRANSLATIONS[this.currentLang];
        const farmerName = document.getElementById('job-farmer-name').value.trim();
        const phone = document.getElementById('job-phone').value.trim();
        const title = document.getElementById('job-title-input').value.trim();
        const workType = document.getElementById('job-work-type').value;
        const crop = document.getElementById('job-crop').value.trim();
        const workersNeeded = parseInt(document.getElementById('job-workers-needed').value) || 5;
        const offeredWage = parseInt(document.getElementById('job-offered-wage').value) || 600;
        const district = document.getElementById('job-district').value;
        const mandal = document.getElementById('job-mandal').value.trim();
        const workDate = document.getElementById('job-date').value;
        const foodProvided = document.getElementById('job-food').value === 'true';
        const desc = document.getElementById('job-desc').value.trim();

        const newJob = {
          id: 'j_' + Date.now(),
          farmerName: `${farmerName} (రైతు)`,
          phone: `+91 ${phone}`,
          whatsapp: `91${phone}`,
          district: district,
          mandal: mandal,
          village: mandal,
          crop: crop,
          workType: workType,
          workTypeLabel_en: title,
          workTypeLabel_te: title,
          workersNeeded: workersNeeded,
          offeredWage: offeredWage,
          workDate: workDate || '2026-09-20',
          duration: '1-2 Days',
          foodProvided: foodProvided,
          description_en: desc || `Urgent requirement for ${workersNeeded} workers for ${crop} field work.`,
          description_te: desc || `${crop} పంట పనికి ${workersNeeded} మంది కూలీలు కావలెను.`,
          postedAgo: 'Just now'
        };

        this.jobs.unshift(newJob);
        this.saveJobs();
        this.closeModal('modal-post-job');
        this.renderJobs();
        this.showToast(t.toastJobPosted);
        postJobForm.reset();

        document.getElementById('job-board').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Emergency SOS Form
    const sosForm = document.getElementById('emergency-sos-form');
    if (sosForm) {
      sosForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = TRANSLATIONS[this.currentLang];
        const name = document.getElementById('sos-name').value.trim();
        const phone = document.getElementById('sos-phone').value.trim();
        const district = document.getElementById('sos-district').value;
        const location = document.getElementById('sos-location').value.trim();
        const count = document.getElementById('sos-count').value;
        const urgency = document.getElementById('sos-urgency').value;
        const reason = document.getElementById('sos-reason').value.trim();

        this.closeModal('modal-emergency-sos');
        this.showToast(t.toastSosSent, true);

        // Pre-fill WhatsApp message to emergency broadcast helpline
        const message = encodeURIComponent(
          `🚨 *EMERGENCY LABOUR REQUEST (అత్యవసర కూలీల అభ్యర్థన)*\n\n` +
          `👤 Farmer Name: ${name}\n` +
          `📞 Phone: ${phone}\n` +
          `📍 Location: ${location}, ${district}\n` +
          `👥 Workers Needed: ${count} Members\n` +
          `⏱️ Urgency: ${urgency}\n` +
          `⚠️ Reason: ${reason}\n\n` +
          `Please dispatch the nearest available Labour Gang immediately!`
        );

        setTimeout(() => {
          window.open(`https://wa.me/919848012345?text=${message}`, '_blank');
        }, 1200);

        sosForm.reset();
      });
    }

    // Review Form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = TRANSLATIONS[this.currentLang];
        const author = document.getElementById('review-author').value.trim();
        const role = document.getElementById('review-role').value;
        const rating = parseInt(document.getElementById('review-rating').value) || 5;
        const comment = document.getElementById('review-comment').value.trim();

        const newReview = {
          author: author,
          author_te: author,
          role: role === 'Farmer' ? 'Farmer (రైతు)' : 'Agricultural Worker (కూలీ)',
          rating: rating,
          date: 'Just now',
          comment_en: comment,
          comment_te: comment
        };

        this.reviews.unshift(newReview);
        this.saveReviews();
        this.closeModal('modal-review');
        this.renderReviews();
        this.showToast(t.toastReviewAdded);
        reviewForm.reset();
      });
    }
  },

  // Filtering & Sorting Workers
  filterWorkers() {
    const district = document.getElementById('search-district').value;
    const mandal = document.getElementById('search-mandal').value;
    const village = document.getElementById('search-village').value;
    const workType = document.getElementById('search-work-type').value;
    const minWorkers = parseInt(document.getElementById('search-worker-count').value) || 0;

    let filtered = this.workers.filter(w => {
      // District match
      if (district && w.district.toLowerCase() !== district.toLowerCase()) return false;
      // Mandal match
      if (mandal && w.mandal.toLowerCase() !== mandal.toLowerCase()) return false;
      // Village match
      if (village && w.village.toLowerCase() !== village.toLowerCase()) return false;
      // Work type match
      if (workType && !w.skills.includes(workType)) return false;
      // Worker count match
      if (minWorkers > 0 && w.groupSize < minWorkers && w.type === 'group') return false;

      // Type pill filter
      if (this.workerFilter === 'available' && w.status !== 'available') return false;
      if (this.workerFilter === 'group' && w.type !== 'group') return false;
      if (this.workerFilter === 'individual' && w.type !== 'individual') return false;

      return true;
    });

    // Sorting
    if (this.workerSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.workerSort === 'wage_asc') {
      filtered.sort((a, b) => a.dailyWage - b.dailyWage);
    } else if (this.workerSort === 'wage_desc') {
      filtered.sort((a, b) => b.dailyWage - a.dailyWage);
    }

    this.renderWorkersList(filtered);
  },

  renderWorkers() {
    this.filterWorkers();
  },

  renderWorkersList(workersList) {
    const container = document.getElementById('workers-container');
    if (!container) return;

    const t = TRANSLATIONS[this.currentLang];

    if (workersList.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 14px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="color: var(--text-main); margin-bottom: 0.5rem;">${t.noWorkersFound}</h3>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('btn-reset-filters').click();">${t.btnClearFilter}</button>
        </div>
      `;
      return;
    }

    container.innerHTML = workersList.map(w => {
      const isTe = this.currentLang === 'te';
      const name = isTe && w.name_te ? w.name_te : w.name_en;
      const bio = isTe && w.bio_te ? w.bio_te : w.bio_en;
      const badgeType = w.type === 'group' 
        ? `<span class="badge badge-group">👥 ${isTe ? 'ముఠా (' + w.groupSize + ' మంది)' : 'Group (' + w.groupSize + ')'}</span>`
        : `<span class="badge badge-solo">👤 ${isTe ? 'వ్యక్తిగత' : 'Individual'}</span>`;

      const statusBadge = w.status === 'available'
        ? `<div class="worker-availability-status"><span class="status-dot available"></span> <span style="color: #16a34a;">${t.statusAvailable}</span></div>`
        : `<div class="worker-availability-status"><span class="status-dot busy"></span> <span style="color: #ea580c;">${t.statusBusy}</span></div>`;

      // WhatsApp Booking Message
      const waMsg = encodeURIComponent(
        `నమస్కారం! / Hello ${name},\nI found your profile on Agri Labour Connect.\n` +
        `I need agricultural workers for my farm in ${w.district} / ${w.mandal}.\n` +
        `Daily Wage: ₹${w.dailyWage}/day.\nAre you available for work?`
      );

      return `
        <article class="worker-card">
          <div>
            <div class="worker-card-top">
              <img src="${w.avatar}" alt="${name}" class="worker-avatar" loading="lazy">
              <div class="worker-main-info">
                <h3 class="worker-name">${name}</h3>
                <div class="worker-location">
                  <span>📍</span> ${w.village}, ${w.mandal}, ${w.district}
                </div>
                <div class="worker-badges">
                  ${badgeType}
                  ${w.verified ? `<span class="badge badge-verified">✓ ${t.badgeVerified}</span>` : ''}
                  <span class="badge badge-rating">⭐ ${w.rating} (${w.reviewsCount})</span>
                </div>
              </div>
            </div>

            <div class="worker-details-grid">
              <div class="detail-item">
                <span class="detail-label">${t.labelWage}</span>
                <span class="detail-val wage-highlight">₹${w.dailyWage} <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted);">/ day</span></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">${t.labelExperience}</span>
                <span class="detail-val">${w.experience}</span>
              </div>
            </div>

            <div style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 0.85rem; line-height: 1.45;">
              ${bio}
            </div>

            <div class="skills-tags">
              ${w.skills.map(s => `<span class="skill-tag">${this.formatSkillTag(s, isTe)}</span>`).join('')}
            </div>

            ${statusBadge}
          </div>

          <div class="worker-actions">
            <a href="tel:${w.phone.replace(/[^0-9+]/g, '')}" class="btn btn-call btn-sm">
              <span>📞</span> ${t.btnCall}
            </a>
            <a href="https://wa.me/${w.whatsapp}?text=${waMsg}" target="_blank" class="btn btn-whatsapp btn-sm">
              <span>💬</span> ${t.btnWhatsapp}
            </a>
          </div>
        </article>
      `;
    }).join('');
  },

  formatSkillTag(skill, isTe) {
    const mapEn = {
      harvesting: "🌾 Harvesting",
      planting: "🌱 Planting",
      spraying: "🧪 Spraying",
      weeding: "🌿 Weeding",
      tractor: "🚜 Tractor",
      plucking: "🌶️ Plucking",
      loading: "📦 Loading"
    };
    const mapTe = {
      harvesting: "🌾 వరి కోత",
      planting: "🌱 నాట్లు",
      spraying: "🧪 పిచికారీ",
      weeding: "🌿 కలుపు తీత",
      tractor: "🚜 ట్రాక్టర్",
      plucking: "🌶️ ఏరడం",
      loading: "📦 లోడింగ్"
    };
    return isTe ? (mapTe[skill] || skill) : (mapEn[skill] || skill);
  },

  // Render Farmer Job Openings
  renderJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const t = TRANSLATIONS[this.currentLang];
    const isTe = this.currentLang === 'te';

    container.innerHTML = this.jobs.map(job => {
      const title = isTe && job.workTypeLabel_te ? job.workTypeLabel_te : job.workTypeLabel_en;
      const desc = isTe && job.description_te ? job.description_te : job.description_en;

      const waMsg = encodeURIComponent(
        `నమస్కారం రైతు గారు / Hello ${job.farmerName},\n` +
        `I saw your job post on Agri Labour Connect for "${title}".\n` +
        `Location: ${job.village}, ${job.district}.\n` +
        `We have workers ready for the date: ${job.workDate}. Please contact me.`
      );

      return `
        <article class="job-card">
          <div>
            <div class="job-header">
              <span class="job-crop-badge">🌾 ${job.crop}</span>
              <span class="job-posted-time">⏱️ ${job.postedAgo}</span>
            </div>

            <h3 class="job-title">${title}</h3>
            
            <div class="job-farmer-info">
              <span>👨‍🌾</span> <strong>${job.farmerName}</strong> • 📍 ${job.village}, ${job.mandal}
            </div>

            <div class="job-desc">
              ${desc}
            </div>

            <div class="job-meta-grid">
              <div class="job-meta-item">
                <span class="job-meta-label">${t.labelNeededWorkers}</span>
                <span class="job-meta-val">👥 ${job.workersNeeded} Workers</span>
              </div>
              <div class="job-meta-item">
                <span class="job-meta-label">${t.labelOfferedWage}</span>
                <span class="job-meta-val wage">₹${job.offeredWage} <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted);">/ worker</span></span>
              </div>
              <div class="job-meta-item">
                <span class="job-meta-label">${t.labelJobDate}</span>
                <span class="job-meta-val">📅 ${job.workDate}</span>
              </div>
              <div class="job-meta-item">
                <span class="job-meta-label">Food / Tea:</span>
                <span class="job-meta-val">${job.foodProvided ? '🍲 Provided (ఇస్తారు)' : '❌ Not Included'}</span>
              </div>
            </div>
          </div>

          <div class="job-actions">
            <a href="tel:${job.phone.replace(/[^0-9+]/g, '')}" class="btn btn-call btn-sm">
              <span>📞</span> ${t.btnCall}
            </a>
            <a href="https://wa.me/${job.whatsapp}?text=${waMsg}" target="_blank" class="btn btn-whatsapp btn-sm">
              <span>💬</span> ${t.btnWhatsapp}
            </a>
          </div>
        </article>
      `;
    }).join('');
  },

  // Render Wage Benchmark Table
  renderWageTable() {
    const tbody = document.getElementById('wage-table-body');
    if (!tbody) return;

    const isTe = this.currentLang === 'te';

    tbody.innerHTML = WAGE_BENCHMARK_DATA.map(item => {
      const op = isTe ? item.operation_te : item.operation_en;
      const crop = isTe ? item.crop_te : item.crop_en;

      return `
        <tr>
          <td><strong>${op}</strong></td>
          <td>${crop}</td>
          <td><span class="wage-amount">${item.wageRange}</span></td>
          <td>${item.ratePerAcre}</td>
          <td><span style="font-size: 0.85rem; color: var(--text-muted);">${item.hours}</span></td>
        </tr>
      `;
    }).join('');
  },

  // Labour Cost Estimator
  calculateLabourCost() {
    const rateSelect = document.getElementById('calc-work-type');
    const workersInput = document.getElementById('calc-workers');
    const daysInput = document.getElementById('calc-days');
    const display = document.getElementById('calc-total-display');

    if (!rateSelect || !workersInput || !daysInput || !display) return;

    const rate = parseInt(rateSelect.value) || 600;
    const workers = parseInt(workersInput.value) || 1;
    const days = parseInt(daysInput.value) || 1;

    const total = rate * workers * days;
    display.textContent = `₹${total.toLocaleString('en-IN')}`;
  },

  // Render Availability Calendar Week
  renderCalendar() {
    const container = document.getElementById('calendar-week-container');
    if (!container) return;

    const days = ['Today (ఈరోజు)', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const dates = [19, 20, 21, 22, 23, 24, 25];
    const status = ['high-avail', 'high-avail', 'tight', 'high-avail', 'tight', 'high-avail', 'high-avail'];
    const label = ['140+ Free', '95+ Free', 'High Demand', '120+ Free', 'Busy Day', '80+ Free', '110+ Free'];

    container.innerHTML = days.map((day, idx) => `
      <div class="calendar-day-col ${idx === 0 ? 'today' : ''}">
        <div class="calendar-day-name">${day}</div>
        <div class="calendar-day-date">Sep ${dates[idx]}</div>
        <span class="calendar-status-badge ${status[idx]}">${label[idx]}</span>
      </div>
    `).join('');
  },

  // Render Testimonials & Reviews
  renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const isTe = this.currentLang === 'te';

    container.innerHTML = this.reviews.map(r => {
      const author = isTe && r.author_te ? r.author_te : r.author;
      const comment = isTe && r.comment_te ? r.comment_te : r.comment_en;
      const stars = '⭐'.repeat(r.rating);

      return `
        <div class="review-card">
          <div>
            <div class="review-stars">${stars}</div>
            <p class="review-text">"${comment}"</p>
          </div>
          <div class="review-author-wrap">
            <div class="author-avatar-placeholder">
              ${author.charAt(0)}
            </div>
            <div class="author-meta">
              <span class="author-name">${author}</span>
              <span class="author-role">${r.role} • ${r.date}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Bilingual Language Engine
  applyLanguage(lang) {
    this.currentLang = lang;
    const t = TRANSLATIONS[lang];
    if (!t) return;

    // Toggle CSS font class for Telugu readability
    if (lang === 'te') {
      document.body.classList.add('lang-te');
      document.documentElement.lang = 'te';
    } else {
      document.body.classList.remove('lang-te');
      document.documentElement.lang = 'en';
    }

    // Update indicator in navbar
    const currentLangText = document.getElementById('current-lang-text');
    if (currentLangText) {
      currentLangText.textContent = t.langToggle;
    }

    // Update all static data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Re-render dynamic components with proper language
    this.renderWageTable();
    this.renderReviews();
    this.renderWorkers();
    this.renderJobs();
  },

  // Toast Notification System
  showToast(message, isSos = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${isSos ? 'toast-sos' : ''}`;
    toast.innerHTML = `<span>${isSos ? '🚨' : '🌾'}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.App = App;
  App.init();
});
