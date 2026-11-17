(() => {
    fetch('./curriculum.json')
        .then(response => response.json())
        .then(data => {
            const curriculum = data.cv;
            console.log('Curriculum data loaded:', curriculum);

            let title = document.querySelector('title');
            title.textContent = `${curriculum.personalInformation.fullName} — ${curriculum.personalInformation.professionalTitle}`;

            let fullNameElement = document.querySelector('[data-field="personalInformation.fullName"]');
            fullNameElement.textContent = curriculum.personalInformation.fullName;

            let photoElement = document.querySelector('.orbit-core');
            photoElement.innerHTML = `<img src="${curriculum.personalInformation.profilePhoto}" alt="Foto de ${curriculum.personalInformation.fullName}">`;

            let professionalTitleElement = document.querySelector('[data-field="personalInformation.professionalTitle"]');
            professionalTitleElement.textContent = curriculum.personalInformation.professionalTitle;

            let professionalSummaryElement = document.querySelector('[data-field="professionalSummary.description"]');
            professionalSummaryElement.textContent = curriculum.professionalSummary.description;

            let emailElement = document.querySelector('[data-field="personalInformation.email"]');
            emailElement.setAttribute('href', `mailto:${curriculum.personalInformation.email}`);
            emailElement.textContent = `Entre em contato ↗`;

            let locationElement = document.querySelector('[data-field="personalInformation.location"]');
            locationElement.textContent = curriculum.personalInformation.location.city + ', ' + curriculum.personalInformation.location.state + ' · ' + curriculum.personalInformation.location.country;

            let availabilityElement = document.querySelector('[data-field="additionalInformation.availability"]');
            availabilityElement.textContent = `Disponibilidade: ${curriculum.additionalInformation.availability}`;

            let workModelElement = document.querySelector('[data-field="additionalInformation.workModel"]');
            workModelElement.textContent = `Modelo de trabalho: ${curriculum.additionalInformation.workModel}`;

            let travelAvailabilityElement = document.querySelector('[data-field="additionalInformation.travelAvailability"]');
            if (curriculum.additionalInformation.travelAvailability) {
                travelAvailabilityElement.textContent = `Disponível para viagens`;
            } else {
                travelAvailabilityElement.textContent = `Não disponível para viagens`;
            }

            let careerObjectiveElement = document.querySelector('[data-field="professionalSummary.careerObjective"]');
            careerObjectiveElement.textContent = curriculum.professionalSummary.careerObjective;

            let yearsOfExperienceElement = document.querySelector('[data-field="professionalSummary.yearsOfExperience"]');
            yearsOfExperienceElement.textContent = `${curriculum.professionalSummary.yearsOfExperience} anos`;

            let mainSpecializationElement = document.querySelector('[data-field="professionalSummary.mainSpecialization"]');
            mainSpecializationElement.textContent = curriculum.professionalSummary.mainSpecialization;

            let professionalExperienceCollection = document.querySelector('[data-collection="professionalExperience"]');
            curriculum.professionalExperience.forEach((experience, index) => {
                let experienceCard = document.createElement('article');
                experienceCard.classList.add('experience-card', 'canva-card');
                experienceCard.id = `experiencia-${index + 1}`;
                let technologies = experience.technologies.map(tech => `<span class="tag canva-tag">${tech}</span>`).join('');
                let experienceContent = `
                    <div>
                        <div class="date" data-field="professionalExperience.${index}.dates">
                        ${experience.startDate} – ${experience.endDate || 'atual'}
                        </div>
                        <div class="place" data-field="professionalExperience.${index}.location">
                        ${experience.location}
                        </div>
                    </div>
                    <div>
                        <h3 data-field="professionalExperience.${index}.position">${experience.position}</h3>
                        <p class="company" data-field="professionalExperience.${index}.company">${experience.company} · ${experience.contractType}</p>
                        <div class="tags" data-field="professionalExperience.${index}.technologies">
                        ${technologies}
                        </div>
                    </div>
                `;
                experienceCard.innerHTML = experienceContent;
                professionalExperienceCollection.appendChild(experienceCard);
            });

            let technologiesCollection = document.querySelector('[data-collection="skills.technical"]');
            curriculum.skills.technical.forEach((skill, index) => {
                let skillCard = document.createElement('article');
                skillCard.classList.add('skill-card', 'canva-card');
                skillCard.id = `skill-${index + 1}`;
                let skillContent = `
                    <div class="skill-name">
                        ${skill.name}
                    </div>
                    <div class="skill-level">
                        ${skill.level}
                    </div>
                `;
                skillCard.innerHTML = skillContent;
                technologiesCollection.appendChild(skillCard);
            });

            let projectsCollection = document.querySelector('[data-collection="projects"]');
            curriculum.projects.forEach((project, index) => {
                let projectCard = document.createElement('article');
                projectCard.classList.add('project-card', 'canva-card');
                projectCard.id = `project-${index + 1}`;
                let projectContent = `
                    <p class="card-label">Projeto · ${project.role}</p>
                    <h3 data-field="projects.${index}.name">${project.name}</h3>
                    <p data-field="projects.${index}.description">${project.description}</p>
                    <div class="tags" data-field="projects.${index}.technologies">
                        ${project.technologies.map(tech => `<span class="tag canva-tag">${tech}</span>`).join('')}
                    </div><a class="project-link canva-link" href="${project.url}" target="_blank" rel="noopener noreferrer" data-field="projects.${index}.url">Visitar projeto ↗</a>
                `;
                projectCard.innerHTML = projectContent;
                projectsCollection.appendChild(projectCard);
            });

            let educationCollection = document.querySelector('[data-collection="education"]');
            curriculum.education.forEach((education, index) => {
                let educationCard = document.createElement('article');
                educationCard.classList.add('education-card', 'canva-card');
                educationCard.id = `education-${index + 1}`;
                let educationDate = new Date(education.startDate);
                education.startDate = educationDate.toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
                if (education.endDate) {
                    let endDate = new Date(education.endDate);
                    education.endDate = endDate.toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
                } else {
                    education.endDate = 'Atual';
                }
                let educationFinished = new Date(education.endDate);
                if (educationFinished === 'Atual') {
                    educationFinished = 'Em andamento';
                } else {
                    educationFinished = 'Concluído';
                }

                let educationContent = `
                    <p class="card-label">Formação · ${education.startDate} – ${education.endDate}</p>
                    <h3 data-field="education.${index}.degree">${education.degree}</h3>
                    <p data-field="education.${index}.institution">${education.institution}</p>
                    <p data-field="education.${index}.fieldOfStudy">${education.fieldOfStudy}</p>
                `;
                educationCard.innerHTML = educationContent;
                educationCollection.appendChild(educationCard);
            });

            let certificationsCollection = document.querySelector('[data-collection="certifications"]');
            curriculum.certifications.forEach((certification, index) => {
                let certificationCard = document.createElement('article');
                certificationCard.classList.add('certification-card', 'canva-card');
                certificationCard.id = `certification-${index + 1}`;
                let initialDate = new Date(certification.issueDate);
                certification.issueDate = initialDate.toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
                let endDate = certification.expirationDate ? new Date(certification.expirationDate) : null;
                certification.expirationDate = endDate ? endDate.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }) : 'Atual';
                let certificationContent = `
                    <p class="card-label">Certificação · ${certification.issueDate} – ${certification.expirationDate}</p>
                    <h3 data-field="certifications.${index}.name">${certification.name}</h3>
                    <p data-field="certifications.${index}.issuer">${certification.issuer}</p>
                    <div class="credential" data-field="certifications.${index}.controlCode">
                        Código de controle: ${certification.controlCode}
                    </div>
                `;
                certificationCard.innerHTML = certificationContent;
                certificationsCollection.appendChild(certificationCard);
            });

            let personnalInformationEmailElement = document.querySelector('li a[data-field="personalInformation.email"]');
            personnalInformationEmailElement.setAttribute('href', `mailto:${curriculum.personalInformation.email}`);
            personnalInformationEmailElement.textContent = `${curriculum.personalInformation.email}`;

            let numberElement = document.querySelector('li a[data-field="personalInformation.phone"]');
            numberElement.setAttribute('href', `tel:${curriculum.personalInformation.phone}`);
            numberElement.textContent = `${curriculum.personalInformation.phone}`;

            let whatsAppElement = document.querySelector('li a[data-field="personalInformation.whatsapp"]');
            whatsAppElement.setAttribute('href', `https://wa.me/${curriculum.personalInformation.whatsapp}`);
            whatsAppElement.textContent = `WhatsApp ↗`;

            let linkedinElement = document.querySelector('li a[data-field="personalInformation.linkedin"]');
            linkedinElement.setAttribute('href', `${curriculum.personalInformation.linkedin}`);
            linkedinElement.textContent = `LinkedIn ↗`;

            let githubElement = document.querySelector('li a[data-field="personalInformation.github"]');
            githubElement.setAttribute('href', `${curriculum.personalInformation.github}`);
            githubElement.textContent = `GitHub ↗`;

            let instagramElement = document.querySelector('li a[data-field="personalInformation.socialMedia.instagram"]');
            instagramElement.setAttribute('href', `${curriculum.personalInformation.socialMedia.instagram}`);
            instagramElement.textContent = `Instagram ↗`;

            let twitchElement = document.querySelector('li a[data-field="personalInformation.socialMedia.twitch"]');
            twitchElement.setAttribute('href', `${curriculum.personalInformation.socialMedia.twitch}`);
            twitchElement.textContent = `Twitch ↗`;

            let youtubeElement = document.querySelector('li a[data-field="personalInformation.socialMedia.youtube"]');
            youtubeElement.setAttribute('href', `${curriculum.personalInformation.socialMedia.youtube}`);
            youtubeElement.textContent = `YouTube ↗`;

            let websiteElement = document.querySelector('li a[data-field="personalInformation.website"]');
            websiteElement.setAttribute('href', `${curriculum.personalInformation.website}`);
            websiteElement.textContent = `Website ↗`;

            let preferredWorkModelElement = document.querySelector('[data-field="preferences.preferredWorkModel"]');
            preferredWorkModelElement.textContent = `Modelo preferido: ${curriculum.preferences.preferredWorkModel}`;

            let preferredLocationsElement = document.querySelector('[data-field="preferences.preferredLocations"]');
            preferredLocationsElement.textContent = `${curriculum.preferences.preferredLocations.join(' · ')}`;

            let targetIndustriesElement = document.querySelector('[data-field="preferences.targetIndustries"]');
            targetIndustriesElement.textContent = `${curriculum.preferences.targetIndustries.join(' · ')}`;

            let languagesCollection = document.querySelector('[data-collection="languages"]');
            curriculum.languages.forEach((language, index) => {
                let languageCard = document.createElement('li');
                languageCard.classList.add('language-card', 'canva-list-item');
                languageCard.id = `language-${index + 1}`;
                let languageContent = `
                    <span data-field="languages.${index}.name">${language.name}</span> · <span data-field="languages.${index}.proficiency">${language.proficiency}</span>
                `;
                languageCard.innerHTML = languageContent;
                languagesCollection.appendChild(languageCard);
            });

            let footerNameElement = document.querySelector('div.footer-bottom span[data-field="personalInformation.fullName"]');
            footerNameElement.textContent = curriculum.personalInformation.fullName;

            let footerLocationElement = document.querySelector('div.footer-bottom span:nth-child(2)');
            footerLocationElement.textContent = `${curriculum.personalInformation.location.city}, ${curriculum.personalInformation.location.state} · ${curriculum.personalInformation.location.country}`;
        });
    })();