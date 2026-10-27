(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

  // nav
  const nav=$('#nav'), burger=$('#burger'), menu=$('#menu');
  const onScroll=()=>{nav.classList.toggle('solid',scrollY>40);
    const w=$('#heroWords'); if(w&&scrollY<innerHeight) w.style.transform='rotate(-32deg) translate('+(scrollY*-.15)+'px,'+(scrollY*.1)+'px)';};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
  $$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false);}));

  // reveal on scroll
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
  $$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el);});

  // logo 3D tilt
  const tilt=$('#tilt'), img=tilt&&$('img',tilt);
  if(img&&matchMedia('(pointer:fine)').matches){
    addEventListener('mousemove',e=>{
      const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
      img.style.transform=`rotateY(${x*28}deg) rotateX(${-y*28}deg)`;
    });
  }

  // statements tabs
  const st=$('#stText'), tabs=$$('.tabs button');
  tabs.forEach(b=>b.addEventListener('click',()=>{
    tabs.forEach(t=>t.setAttribute('aria-selected',t===b));
    st.classList.add('out');
    setTimeout(()=>{st.textContent=st.dataset[b.dataset.t];st.classList.remove('out');},220);
  }));

  // contact form -> WhatsApp
  const form=$('#form'), hint=$('#hint');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(form), name=(f.get('name')||'').trim(), msg=(f.get('msg')||'').trim();
    $$('input,textarea',form).forEach(i=>i.classList.remove('invalid'));
    if(!name||!msg){
      if(!name)form.name.classList.add('invalid'); if(!msg)form.msg.classList.add('invalid');
      hint.textContent='Please add your name and a short message.'; return;
    }
    hint.textContent='';
    const text=`Hello Remarkable Guest, I'm ${name}.\nService: ${f.get('service')}\n${msg}`;
    const WA='254716319393';
    const url='https://wa.me/'+WA+'?text='+encodeURIComponent(text);
    const a=document.createElement('a');
    a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
    hint.style.color='#2e7d32';hint.textContent='Opening WhatsApp (+254 716 319 393)…';
  });

  $('#yr').textContent=new Date().getFullYear();
})();
