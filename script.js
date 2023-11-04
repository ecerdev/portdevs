const userInfo = document.querySelector('.userInfo');
const userImg = document.querySelector('.userImg');
const boxTituloRepo = document.querySelector('.boxTituloRepo');
const boxDataRepo = document.querySelector('.boxDataRepo');
const boxURL = document.querySelector('.boxURL');
const boxLanguage = document.querySelector('.boxLanguage');
const inputGitUser = document.querySelector('.inputGitUser');
const logoTipo = document.querySelector('.logoTipo');
const boxRepositorio = document.querySelector('.boxRepositorio');
const buscaRepoLogo = document.getElementById('buscaRepoLogo');

const btnAcessoGit = document.querySelector('.btnAcessoGit');

const formularioGitHub = document.querySelector('.formularioGitHub');
const cardProjetos = document.querySelector('.cardProjetos');

const boxUserInfo = document.querySelector('.boxUserInfo');

const btnPesquisar = document.querySelector('.btnPesquisar');

// console.log(imagemUsuarioGit);

boxUserInfo.style.display = 'none';
boxRepositorio.style.display = 'none';


btnPesquisar.addEventListener('click', async (event) => {
  event.preventDefault();

  const GitHubPages = inputGitUser.value;

  // Primeira chamada para obter os repositórios do usuário
  const repoResponse = await fetch(`https://api.github.com/users/${GitHubPages}/repos`);
  const repoData = await repoResponse.json();

  // Segunda chamada para obter informações do usuário
  const userResponse = await fetch(`https://api.github.com/users/${GitHubPages}`);
  const userData = await userResponse.json();

  // Atualizar informações do usuário
  userInfo.innerHTML = userData.name;
  userImg.src = userData.avatar_url;

  btnAcessoGit.href = userData.html_url;

  // Loop através dos repositórios
  repoData.forEach(item => {
    let infoRepoGit = document.createElement('div');
    boxUserInfo.style.display = 'flex';
    infoRepoGit.classList.add('boxRepoInfos');
    // infoRepoGit.style.opacity = 0; // Defina a opacidade para 0    
    infoRepoGit.innerHTML = `
      <div class="headerRepo">
        <h4 class="title">${item.name}</h4>
        <span class="date-create">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</span>
      </div>
      <div class="bodyRepo">
       <span class="language"><i class="fa-solid fa-code"></i> ${item.language}<span class="circle"></span></span>
      </div>
      <div class="footerRepo">
        <a href="${item.html_url}" target="_blank">Repositório</a>        
      </div>
    `;



    cardProjetos.appendChild(infoRepoGit);
    infoRepoGit.classList.add('fadeIn');
    boxRepositorio.style.display = 'block';
    buscaRepoLogo.style.display = 'none';

  });

  // Adicionar classes para ativar o efeito de fadeIn
  boxUserInfo.classList.add('fadeIn');
  cardProjetos.classList.add('fadeIn');

  // Esconder o formulário e o logotipo
  formularioGitHub.style.display = 'none';
  // logoTipo.style.display = 'none';
});

// Remova as classes 'fadeIn' quando a transição for concluída
boxUserInfo.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'opacity' && boxUserInfo.classList.contains('fadeIn')) {
    boxUserInfo.classList.remove('fadeIn');
  }
});