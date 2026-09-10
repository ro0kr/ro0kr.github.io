(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`,t=`
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
float rayStrength(vec2 source,vec2 direction,vec2 coord,float a,float b,float speed){
  vec2 delta=coord-source;
  float angle=dot(normalize(delta),direction);
  return clamp((.45+.15*sin(angle*a+uTime*speed))+(.3+.2*cos(-angle*b+uTime*speed)),0.,1.)*
    clamp((uResolution.x-length(delta))/uResolution.x,.5,1.);
}
void main(){
  vec2 frag=gl_FragCoord.xy;
  vec2 coord=vec2(frag.x,uResolution.y-frag.y);
  vec2 source=vec2(uResolution.x*1.1,-.5*uResolution.y);
  float spread=2.0*.275;
  vec2 d1=normalize(vec2(cos(.785398+spread),sin(.785398+spread)));
  vec2 d2=normalize(vec2(cos(.785398-spread),sin(.785398-spread)));
  vec3 c1=vec3(.157,.333,1.0)*rayStrength(source,d1,coord,36.2214,21.11349,1.15);
  vec3 c2=vec3(.588,.784,1.0)*rayStrength(source,d2,coord,22.3991,18.0234,.23);
  vec3 color=c1*.25+c2*.75;
  float distanceToLight=length(frag-vec2(source.x,uResolution.y-source.y))/uResolution.y;
  color*=.8/pow(max(distanceToLight,.001),1.6);
  float gray=dot(color,vec3(.299,.587,.114));
  color=mix(vec3(gray),color,1.5);
  float alpha=max(color.r,max(color.g,color.b))*.86;
  gl_FragColor=vec4(color,alpha);
}`;function n(t,n,r=!1){let i=document.createElement(`canvas`),a=i.getContext(`webgl`,{alpha:!0,premultipliedAlpha:!1});if(!a)return()=>{};let o=(e,t)=>{let n=a.createShader(e);if(a.shaderSource(n,t),a.compileShader(n),!a.getShaderParameter(n,a.COMPILE_STATUS))throw Error(a.getShaderInfoLog(n));return n},s=a.createProgram();a.attachShader(s,o(a.VERTEX_SHADER,e)),a.attachShader(s,o(a.FRAGMENT_SHADER,n)),a.linkProgram(s),a.useProgram(s);let c=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,c),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),a.STATIC_DRAW);let l=a.getAttribLocation(s,`position`);a.enableVertexAttribArray(l),a.vertexAttribPointer(l,2,a.FLOAT,!1,0,0);let u=a.getUniformLocation(s,`uTime`),d=a.getUniformLocation(s,`uResolution`),f=a.getUniformLocation(s,`uMouse`),p=[.5,.5],m=[.5,.5],h=0,g=()=>{let e=Math.min(devicePixelRatio||1,1.5),n=Math.max(1,t.clientWidth),r=Math.max(1,t.clientHeight);i.width=n*e,i.height=r*e,a.viewport(0,0,i.width,i.height)},_=e=>{let t=i.getBoundingClientRect();m=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]},v=e=>{p[0]+=(m[0]-p[0])*.05,p[1]+=(m[1]-p[1])*.05,a.uniform1f(u,e*.001),a.uniform2f(d,i.width,i.height),f&&a.uniform2f(f,p[0],p[1]),a.drawArrays(a.TRIANGLES,0,3),h=requestAnimationFrame(v)};i.className=`effect-canvas`,t.append(i);let y=new ResizeObserver(g);return y.observe(t),r&&addEventListener(`pointermove`,_,{passive:!0}),g(),h=requestAnimationFrame(v),()=>{cancelAnimationFrame(h),y.disconnect(),r&&removeEventListener(`pointermove`,_),a.getExtension(`WEBGL_lose_context`)?.loseContext(),i.remove()}}function r(){let e=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=[],i=new IntersectionObserver(e=>e.forEach(e=>e.isIntersecting&&e.target.classList.add(`is-visible`)),{threshold:.12});document.querySelectorAll(`.reveal`).forEach(e=>i.observe(e)),r.push(()=>i.disconnect()),document.querySelectorAll(`[data-split]`).forEach(e=>{let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;n.nextNode();)t.push(n.currentNode);let r=0;t.forEach(e=>{let t=document.createDocumentFragment();[...e.textContent].forEach(e=>{if(e===` `)return t.append(` `);let n=document.createElement(`span`);n.className=`split-char`,n.style.setProperty(`--char-index`,r++),n.textContent=e,t.append(n)}),e.replaceWith(t)}),requestAnimationFrame(()=>e.classList.add(`split-visible`))}),e||document.querySelectorAll(`.side-rays`).forEach(e=>r.push(n(e,t))),addEventListener(`pagehide`,()=>r.forEach(e=>e()),{once:!0})}var i=`<span aria-hidden="true">↗</span>`;document.querySelector(`#app`).innerHTML=`
  <header class="site-header">
    <a class="brand" href="#top" aria-label="로청단 홈">
      <span class="brand-mark">ㄹㅊ</span><span>로청단</span>
    </a>
    <nav aria-label="주요 메뉴">
      <a href="#about">소개</a><a href="#news">뉴스</a><a href="#principles">원칙</a>
    </nav>
    <a class="header-join" href="/openchat" target="_blank" rel="noopener noreferrer">함께하기 ${i}</a>
  </header>

  <main id="top">
    <section class="hero section-shell" aria-labelledby="hero-title">
      <p class="eyebrow reveal">ROBLOX CREATOR CULTURE WATCH · 2026</p>
      <h1 id="hero-title" class="split-title" data-split>훔친 관심을<br><em>원래 자리로.</em></h1>
      <div class="hero-foot reveal">
        <p>창작자의 이름과 맥락이 사라지지 않도록.<br>우리는 기록하고, 확인하고, 비평합니다.</p>
        <div class="hero-actions">
          <a class="button button-dark" href="/discord" target="_blank" rel="noopener noreferrer">Discord 참여 ${i}</a>
          <a class="button button-light" href="/openchat" target="_blank" rel="noopener noreferrer">오픈채팅 ${i}</a>
        </div>
      </div>
      <div class="scroll-note" aria-hidden="true"><span></span>SCROLL TO READ</div>
    </section>

    <section id="about" class="manifesto section-shell reveal">
      <p class="section-index">01 / ABOUT</p>
      <div>
        <h2>사라지는 출처를<br>그냥 지나치지 않습니다.</h2>
        <p class="lead">로블계 청산단은 타인의 영상·음원을 무단으로 가져오거나, 죄책감과 불안을 자극해 반응을 요구하는 콘텐츠 문화를 비판적으로 기록하는 커뮤니티입니다.</p>
      </div>
    </section>

    <section class="focus-grid section-shell">
      <article class="focus-card reveal"><span class="symbol">⌁</span><p class="card-number">A—01</p><h3>무단 사용</h3><p>영상과 음원의 원작자가 지워진 채 재게시되는 문제를 살핍니다.</p></article>
      <article class="focus-card reveal"><span class="symbol">※</span><p class="card-number">A—02</p><h3>감정 강요</h3><p>“사랑한다면 구독”처럼 불편한 감정을 이용하는 참여 유도를 비평합니다.</p></article>
      <article class="focus-card reveal"><span class="symbol">↳</span><p class="card-number">A—03</p><h3>맥락 복원</h3><p>추측보다 확인을 우선하고, 원출처와 사실관계를 함께 기록합니다.</p></article>
    </section>

    <section id="news" class="news section-shell" aria-labelledby="news-title">
      <div class="section-heading reveal">
        <div><p class="section-index">02 / NEWSROOM</p><h2 id="news-title">최근 기록</h2></div>
        <p>이미지보다 글을 중심으로,<br>확인 가능한 내용만 전합니다.</p>
      </div>
      <div class="news-list">
        <article class="news-item reveal"><a href="#principles"><span class="news-meta">공지 · 운영 원칙</span><h3>비판과 공격 사이, 로청단이 지키는 세 가지 기준</h3><p>사람이 아닌 행위를 다루고, 공개된 근거를 확인하며, 수정과 반론의 가능성을 열어둡니다.</p><span class="news-date">2026.09.09　↗</span></a></article>
        <article class="news-item reveal"><a href="#join"><span class="news-meta">안내 · 제보</span><h3>제보하기 전, 원본 링크와 게시 시점을 확인해 주세요</h3><p>잘못된 지목을 줄이기 위해 캡처만이 아닌 원문 주소와 확인 가능한 맥락을 함께 받습니다.</p><span class="news-date">GUIDE　↗</span></a></article>
        <article class="news-item reveal"><a href="#about"><span class="news-meta">아카이브 · 준비 중</span><h3>출처 표기 문화를 위한 기록 보관소를 준비합니다</h3><p>사라지는 게시물과 정정 내역을 공정하게 남길 수 있는 글 기반 아카이브입니다.</p><span class="news-date">SOON　↗</span></a></article>
      </div>
    </section>

    <section id="principles" class="principles">
      <div class="side-rays" aria-hidden="true"></div>
      <div class="section-shell">
        <p class="section-index reveal">03 / PRINCIPLES</p>
        <h2 class="reveal">청산은 삭제가 아니라,<br><em>더 나은 기준을 남기는 일.</em></h2>
        <ol>
          <li class="reveal"><span>01</span><strong>사람 대신 행위를 비판합니다.</strong><p>조리돌림, 신상 공개, 집단 괴롭힘을 지양합니다.</p></li>
          <li class="reveal"><span>02</span><strong>추측보다 근거를 먼저 봅니다.</strong><p>원문과 출처, 게시 시점, 정정 여부를 함께 확인합니다.</p></li>
          <li class="reveal"><span>03</span><strong>반론과 수정을 열어둡니다.</strong><p>오류가 확인되면 기록을 바로잡고 변경 사실을 남깁니다.</p></li>
        </ol>
      </div>
    </section>

    <section id="join" class="join section-shell reveal">
      <p class="section-index">04 / JOIN THE CONVERSATION</p><h2>기록에 힘을<br>보태 주세요.</h2>
      <p>제보, 토론, 정정 요청을 기다립니다.<br>참여 전 커뮤니티 원칙을 먼저 확인해 주세요.</p>
      <div class="join-links">
        <a href="/discord" target="_blank" rel="noopener noreferrer"><small>01</small><strong>로청단 디스코드</strong><span>/discord　↗</span></a>
        <a href="/openchat" target="_blank" rel="noopener noreferrer"><small>02</small><strong>로청단 오픈채팅</strong><span>/openchat　↗</span></a>
      </div>
    </section>
  </main>

  <footer class="site-footer section-shell">
    <a class="brand" href="#top"><span class="brand-mark">ㄹㅊ</span><span>로청단</span></a>
    <p>기록하고 · 확인하고 · 바로잡기</p><p>© 2026 로블계 청산단</p>
  </footer>
`,r();