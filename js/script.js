document.addEventListener('DOMContentLoaded', () => {
  const btnNao = document.getElementById('btnNao');
  const btnSim = document.getElementById('btnSim');
  const areaBotoes = document.getElementById('areaBotoes');
  const mensagemSucesso = document.getElementById('mensagemSucesso');

  if (!btnNao || !btnSim) return;

  const frases = [
    "Ops! Quase...",
    "Essa opção não vale! 😂",
    "Erro 404: Recusa não encontrada",
    "Tente o outro botão! ➔",
    "Nem adianta tentar!",
    "Opção bloqueada pela turma 🔒",
    "Só existe um caminho! 🎓"
  ];
  let indiceFrase = 0;

  function fugir() {
    // Força o botão a ser posição fixa no topo
    btnNao.style.position = 'fixed';
    btnNao.style.zIndex = '999999';

    const padding = 20;
    const largura = btnNao.offsetWidth || 100;
    const altura = btnNao.offsetHeight || 44;

    const maxX = window.innerWidth - largura - padding;
    const maxY = window.innerHeight - altura - padding;

    const posX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const posY = Math.floor(Math.random() * (maxY - padding)) + padding;
    const rot = Math.floor(Math.random() * 24) - 12;

    btnNao.style.left = `${posX}px`;
    btnNao.style.top = `${posY}px`;
    btnNao.style.transform = `rotate(${rot}deg)`;
    btnNao.style.transition = 'left 0.15s ease, top 0.15s ease, transform 0.15s ease';

    // Atualiza o texto
    indiceFrase++;
    btnNao.textContent = frases[indiceFrase % frases.length];
  }

  // Intercepta múltiplos eventos para garantir disparo em PC e Celular
  btnNao.addEventListener('mouseenter', fugir);
  btnNao.addEventListener('mouseover', fugir);
  btnNao.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    fugir();
  });
  btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();
    fugir();
  }, { passive: false });
  btnNao.addEventListener('click', (e) => {
    e.preventDefault();
    fugir();
  });

  // Disparo ao clicar no SIM
  btnSim.addEventListener('click', () => {
    btnNao.style.display = 'none';
    if (areaBotoes) areaBotoes.style.display = 'none';
    if (mensagemSucesso) {
      mensagemSucesso.classList.remove('oculto');
      mensagemSucesso.style.display = 'block';
    }

    // Dispara chuva de confetes nativa em CSS
    lancarConfetesNativos();
  });

  function lancarConfetesNativos() {
    const cores = ['#d4af37', '#f472b6', '#ffffff', '#38bdf8', '#fbbf24'];
    for (let i = 0; i < 60; i++) {
      const confete = document.createElement('div');
      confete.className = 'confete-nativo';
      confete.style.left = Math.random() * 100 + 'vw';
      confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
      confete.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      confete.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(confete);

      setTimeout(() => confete.remove(), 4000);
    }
  }
});