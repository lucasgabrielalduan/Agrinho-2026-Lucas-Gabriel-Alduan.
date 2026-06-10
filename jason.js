// Dados das plantações
const plantacoesData = [
    {
        nome: "Soja + Bioinsumos",
        desc: "Manejo com fixação biológica de nitrogênio reduz emissões e mantém produtividade, com rotação de culturas.",
        imgUrl: "https://images.pexels.com/photos/1024543/agriculture-soybean-field-farming-1024543.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        nome: "Milho Consorciado",
        desc: "Consórcio com braquiária aumenta palhada e sequestra carbono, além de melhorar a umidade do solo.",
        imgUrl: "https://images.pexels.com/photos/1544470/corn-field-corn-plant-corn-plants-1544470.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        nome: "Café Sombreado",
        desc: "Cultivo agroflorestal com árvores nativas protege nascentes, aumenta biodiversidade e grãos de qualidade.",
        imgUrl: "https://images.pexels.com/photos/157901/coffee-berries-coffee-berries-ripening-coffee-plantation-157901.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        nome: "Horta Agroecológica",
        desc: "Produção de hortaliças sem agrotóxicos, utilizando compostagem e controle biológico de pragas.",
        imgUrl: "https://images.pexels.com/photos/2325446/vegetables-farming-agriculture-organic-2325446.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

// Dados das estatísticas
const statsData = [
    { number: "+40%", text: "produtividade com agroecologia" },
    { number: "-30%", text: "uso de água por hectare" },
    { number: "+25%", text: "matéria orgânica no solo" }
];

// Array de dicas sustentáveis
const dicasArray = [
    { titulo: "🌿 Plantas de cobertura viva", texto: "Mantenha o solo sempre coberto com leguminosas como feijão-guandu. Isso evita erosão e fixa nitrogênio." },
    { titulo: "🐝 Polinizadores na lavoura", texto: "Instale faixas de flores nativas nas bordas das plantações. Aumenta a produtividade e preserva abelhas nativas." },
    { titulo: "💧 Captação de água da chuva", texto: "Reservatórios simples coletam água para irrigação de pequenas áreas, reduzindo demanda de rios." },
    { titulo: "🌳 Integração Lavoura-Pecuária-Floresta", texto: "Sistema ILPF aumenta renda, sequestra carbono e diversifica a produção em uma mesma área." },
    { titulo: "🍂 Compostagem de resíduos", texto: "Transforme restos de colheita em adubo orgânico rico, reduzindo lixo e fertilizantes químicos." },
    { titulo: "💚 Agricultura de precisão", texto: "Uso de drones e sensores reduz desperdícios e otimiza insumos, protegendo o meio ambiente." }
];

let dicaAtual = 0;

// Função para exibir toast (mensagem temporária)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Renderizar cards de plantações
function renderCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    plantacoesData.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${plant.imgUrl}');"></div>
            <div class="card-info">
                <h3>🌾 ${plant.nome}</h3>
                <p>${plant.desc}</p>
                <small style="color:#7b9c3e;">🌿 Prática sustentável integrada</small>
            </div>
        `;
        
        card.addEventListener('click', () => {
            showToast(`🌱 Você explorou: ${plant.nome}! Essa plantação equilibra produção e meio ambiente.`);
        });
        
        container.appendChild(card);
    });
}

// Renderizar estatísticas
function renderStats() {
    const container = document.getElementById('statsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    statsData.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <p>${stat.text}</p>
        `;
        
        statCard.addEventListener('click', () => {
            showToast(`📊 ${stat.number} ${stat.text} - Dados reais de fazendas sustentáveis!`);
        });
        
        container.appendChild(statCard);
    });
}

// Calcular impacto sustentável
function calcularImpacto() {
    const cultura = document.getElementById('culturaSelect').value;
    let area = parseFloat(document.getElementById('areaHectares').value);
    const tecnologia = document.getElementById('tecnologiaSelect').value;
    const resultadoDiv = document.getElementById('resultadoSimulador');
    
    if (isNaN(area) || area <= 0) {
        resultadoDiv.innerHTML = '⚠️ Por favor, insira uma área válida (maior que 0 hectares).';
        return;
    }
    
    // Dados base por cultura
    const culturasData = {
        soja: { produtividade: 3.2, nome: 'Soja' },
        milho: { produtividade: 5.5, nome: 'Milho' },
        cafe: { produtividade: 2.4, nome: 'Café' },
        horta: { produtividade: 18, nome: 'Horta' }
    };
    
    const culturaInfo = culturasData[cultura];
    let produtividadeBase = culturaInfo.produtividade;
    
    // Fatores por tecnologia
    const tecnologiaData = {
        irrigacao: { fator: 1.25, agua: 45, carbono: 0.8, desc: '💧 Irrigação por gotejamento reduz desperdício e aumenta eficiência hídrica.' },
        rotacao: { fator: 1.30, agua: 20, carbono: 1.2, desc: '🔄 Rotação de culturas melhora a fertilidade e quebra ciclos de pragas.' },
        agrofloresta: { fator: 1.35, agua: 35, carbono: 2.5, desc: '🌳 Sistemas agroflorestais sequestram muito carbono e protegem a biodiversidade.' },
        convencional: { fator: 1.0, agua: 0, carbono: 0.1, desc: 'Manejo convencional sem tecnologias verdes.' }
    };
    
    const tecInfo = tecnologiaData[tecnologia];
    const prodFinal = produtividadeBase * tecInfo.fator;
    const producaoTotal = prodFinal * area;
    const reducaoCO2 = tecInfo.carbono * area;
    const aguaEconomizada = (tecInfo.agua / 100) * (area * 2500);
    
    let seloMsg = '';
    if (tecnologia !== 'convencional') {
        if (tecInfo.agua > 30 && tecInfo.carbono > 1.2) {
            seloMsg = '🌍 Selo Ouro Sustentável: práticas regenerativas de alto impacto!';
        } else if (tecInfo.agua > 15 || tecInfo.carbono > 0.8) {
            seloMsg = '🥈 Selo Prata – caminho da sustentabilidade, continue evoluindo!';
        } else {
            seloMsg = '🥉 Selo Bronze – boas práticas iniciam a transição ecológica.';
        }
    } else {
        seloMsg = '⚠️ Selo base convencional. Adotar técnicas verdes pode aumentar produção e reduzir impactos.';
    }
    
    resultadoDiv.innerHTML = `
        <strong>🌱 RESULTADO PARA ${area} hectares de ${culturaInfo.nome}:</strong><br><br>
        📈 Produtividade estimada: ${prodFinal.toFixed(1)} ton/ha → produção total: ${producaoTotal.toFixed(1)} toneladas.<br>
        💧 Economia de água: ${aguaEconomizada.toFixed(0)} litros ${tecInfo.agua > 0 ? `(${tecInfo.agua}% menos uso)` : '(sem ganho hídrico)'}.<br>
        🌳 Carbono sequestrado/evitado: ${reducaoCO2.toFixed(1)} ton CO₂ equivalente.<br>
        🔧 Tecnologia aplicada: ${tecInfo.desc}<br><br>
        🏅 <strong>${seloMsg}</strong><br><br>
        <i style="color:#2c6e2c;">✨ Equilíbrio entre produção e meio ambiente é possível: cada técnica sustentável gera ganhos para o futuro!</i>
    `;
    
    showToast(`🌿 Cálculo realizado! Verifique seu selo sustentável.`);
}

// Atualizar dica
function atualizarDica() {
    const dicaContainer = document.getElementById('dicaContainer');
    if (!dicaContainer) return;
    
    const dica = dicasArray[dicaAtual % dicasArray.length];
    dicaContainer.innerHTML = `
        <h3>✨ ${dica.titulo}</h3>
        <p>${dica.texto}</p>
        <button id="novaDicaBtn" class="btn btn-secondary">💡 Próxima dica sustentável</button>
    `;
    
    const novoBotao = document.getElementById('novaDicaBtn');
    if (novoBotao) {
        novoBotao.addEventListener('click', () => {
            dicaAtual++;
            atualizarDica();
            showToast('💚 Nova dica sustentável para você!');
        });
    }
}

// Menu mobile toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Smooth scroll para links de navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Fechar menu mobile se estiver aberto
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderStats();
    
    const btnCalcular = document.getElementById('calcularImpacto');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', calcularImpacto);
    }
    
    atualizarDica();
    initMobileMenu();
    initSmoothScroll();
    
    // Animação de entrada para os cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('🌱 Site Agrinho carregado com sucesso!');
});