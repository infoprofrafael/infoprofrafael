
// Pequeno script para tornar a timeline 'edit-friendly' no browser: clona o primeiro item como template
document.getElementById('addItem').addEventListener('click', function(){
const timeline = document.getElementById('timeline');
const first = timeline.querySelector('.timeline-item');
if(!first) return;
const clone = first.cloneNode(true);


// limpar textos que talvez você queira editar rápido
clone.querySelectorAll('h3').forEach((h)=>{ h.textContent = 'Novo Marco — Título'; });
clone.querySelectorAll('time').forEach((t)=>{ t.textContent = 'AAAA'; });
clone.querySelectorAll('p').forEach((p,i)=>{ if(i<2) p.textContent = 'Descrição do marco — substitua com suas informações.'; });


timeline.appendChild(clone);
// aplicar observer para animação
observeReveal();
});


// Observer simples para animar cards quando entram na viewport
function observeReveal(){
const items = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting) e.target.classList.add('visible');
});
},{threshold:0.12});
items.forEach(i=>obs.observe(i));
}
observeReveal();


// Dica: para editar diretamente no Netlify/VS Code basta trocar os conteúdos dos <h3>, <time> e <p> nos blocos.
