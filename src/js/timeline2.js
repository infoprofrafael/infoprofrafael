// animação dos cards ao aparecer na viewport
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