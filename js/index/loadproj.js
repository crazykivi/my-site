function loadProjects() {
  //document.getElementById("loading-overlay").style.display = "block";
  fetch(`https://nikitaredko.ru:3000/projects/get-projects-index`)
    .then((response) => response.json())
    .then((data) => {
      renderProjects(data.projects);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

loadProjects();

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";

  //let isFirstProject = true;

  projects.forEach((project, index) => {
    const projectElement = document.createElement("div");
    projectElement.className = "col-md-6 col-lg-4 project-card";

    projectElement.innerHTML = `
      <div class="card">
        <a href="${project.project_url}">
          <img src="${project.image_url}" class="card-img-top" alt="${
      project.project_name
    }">
        </a>
        <div class="card-body">
          <h5 class="card-title">${project.project_name}</h5>
          <p><strong>Стек технологий:</strong><br>
            Фронтенд: ${project.frontend_technologies || "Не указан"}<br>
            Бекенд: ${project.backend_technologies || "Не указан"}
          </p>
          <a href="${
            project.project_url
          }" class="btn btn-primary btn-sm">Перейти к проекту</a>
          <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#aboutProject${
            project.project_id
          }" aria-expanded="false" aria-controls="aboutProject">
            Подробнее о проекте
          </button>
          <div class="collapse" id="aboutProject${project.project_id}">
            <p>${project.description || "Описание отсутствует."}</p>
          </div>
        </div>
      </div>
    `;

    projectsList.appendChild(projectElement);

    setTimeout(() => {
      projectElement.classList.add("visible");

      /* if (isFirstProject) {
        document.getElementById("loading-overlay").style.opacity = "1";
        isFirstProject = false;
      } */
    }, index * 200);
  });
}
