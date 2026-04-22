// ── State ─────────────────────────────────────────────────────────────────────
let sel = 'JPN';
let worldData = null;
let cmap = {};
let svgEl, proj, path, gCountries, gPaths, zoom;


function buildMap() {
  cmap = {};
  const p = P[sel];
  (p.vf  || []).forEach(c => cmap[c] = 'vf');
  (p.voa || []).forEach(c => { if (!cmap[c]) cmap[c] = 'voa'; });
  cmap[p.n] = 'home';
}

function clr(id) {
  const v = cmap[id];
  if (v === 'home') return CLR.home;
  if (v === 'vf')   return CLR.vf;
  if (v === 'voa')  return CLR.voa;
  return CLR.req;
}

function statusInfo(id) {
  const v = cmap[id];
  if (v === 'home') return ['ts-home', 'ORIGIN POINT'];
  if (v === 'vf')   return ['ts-vf',   'VISA-FREE ✓'];
  if (v === 'voa')  return ['ts-voa',  'VISA ON ARRIVAL'];
  return ['ts-req', 'VISA REQUIRED'];
}

// ── UI Logic ──────────────────────────────────────────────────────────────────
function populateSel() {
  const el = document.getElementById('csel');
  Object.entries(P).sort((a, b) => a[1].rank - b[1].rank).forEach(([k, v]) => {
    const o = document.createElement('option');
    o.value = k;
    o.textContent = `${v.flag} ${v.name} (Rank #${v.rank})`;
    el.appendChild(o);
  });
  el.value = sel;
  el.addEventListener('change', e => { sel = e.target.value; updateAll(); });
}

function renderCard() {
  const p = P[sel];
  document.getElementById('pcard').innerHTML = `
    <div class="pc-head">
      <div class="pc-flag">${p.flag}</div>
      <div><div class="pc-name">${p.name}</div><div class="pc-rank">GLOBAL RANK #${p.rank}</div></div>
    </div>
    <div class="stats">
      <div class="stat">
      <div class="stat-val sv-g">${p.s.vf}</div>
      <div class="sect-lbl">VF</div></div>
      <div class="stat"><div class="stat-val sv-a">${p.s.voa}</div><div class="sect-lbl">VOA</div></div>
    </div>`;

  const tot = p.total || 195;
  document.getElementById('pbars').innerHTML = `
    ${bar('Visa-Free', '#10B981', p.s.vf, tot)}
    ${bar('On-Arrival','#F59E0B', p.s.voa, tot)}
    ${bar('Required',  '#2A364E', p.s.req, tot)}`;

  document.getElementById('rank-badge').textContent = `RANK #${p.rank}`;
}

function bar(label, color, count, tot) {
  const pct = Math.round(count / tot * 100);
  return `<div class="pb-row"><div class="pb-track"><div class="pb-fill" style="width:${pct}%;background:${color}"></div></div></div>`;
}

// ── D3 Engine (Locked Parameters) ──────────────────────────────────────────────
function initMap() {
  const wrap = document.getElementById('map-wrap');
  const W = wrap.clientWidth;
  const H = wrap.clientHeight;

  svgEl = d3.select('#mapsvg').attr('viewBox', `0 0 ${W} ${H}`);
  proj = d3.geoNaturalEarth1().scale(W / 6).translate([W / 2, H / 2]);
  path = d3.geoPath().projection(proj);

  // Parameter Constraints
  zoom = d3.zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [W, H]])
    .on('zoom', (e) => {
      gCountries.attr('transform', e.transform);
      gPaths.attr('transform', e.transform);
      gCountries.selectAll('path').attr('stroke-width', 0.3 / e.transform.k);
    });

  svgEl.call(zoom);

  // Reset Button Logic
  document.getElementById('reset-btn').onclick = () => {
    svgEl.transition().duration(800).call(zoom.transform, d3.zoomIdentity);
  };

  const grat = d3.geoGraticule()();
  svgEl.append('path').datum(grat).attr('d', path)
    .attr('fill', 'none').attr('stroke', 'rgba(0,200,255,0.05)').attr('stroke-width', 0.5);

  gCountries = svgEl.append('g');
  gPaths = svgEl.append('g').attr('pointer-events', 'none');

  drawCountries();
}

function drawCountries(transition = false) {
  if (!worldData) return;
  const features = topojson.feature(worldData, worldData.objects.countries).features;
  const reticle = document.getElementById('reticle');

  window.onmousemove = (e) => {
    reticle.style.left = e.clientX + 'px';
    reticle.style.top = e.clientY + 'px';
  };

  const join = gCountries.selectAll('path').data(features, d => d.id);

  join.join(
    enter => enter.append('path')
      .attr('d', path)
      .attr('fill', d => clr(+d.id))
      .attr('stroke', 'rgba(0,0,0,0.5)').attr('stroke-width', 0.3)
      .on('mouseenter', function() { 
        reticle.classList.add('active'); 
        d3.select(this).attr('stroke', 'rgba(255,255,255,0.5)').attr('stroke-width', 0.8);
      })
      .on('mouseleave', function() { 
        reticle.classList.remove('active'); 
        d3.select(this).attr('stroke', 'rgba(0,0,0,0.5)').attr('stroke-width', 0.3);
        document.getElementById('tt').style.opacity = '0';
      })
      .on('mousemove', (e, d) => {
        const tt = document.getElementById('tt');
        const [cls, lbl] = statusInfo(+d.id);
        document.getElementById('tt-name').textContent = N[+d.id] || "Unknown";
        document.getElementById('tt-stat').className = cls;
        document.getElementById('tt-stat').textContent = lbl;
        tt.style.opacity = '1';
        tt.style.left = (e.clientX + 20) + 'px';
        tt.style.top = (e.clientY - 40) + 'px';
      })
      .on('click', function(e, d) {
        const id = +d.id;
        createLabel(N[id] || "Unknown", e.clientX, e.clientY);
        jumpToCountry(id);
      }),
    
    update => transition ? update.transition().duration(650).attr('fill', d => clr(+d.id)) : update.attr('fill', d => clr(+d.id))
  );
}

function createLabel(text, x, y) {
  d3.selectAll('.floating-label').remove();
  const label = document.createElement('div');
  label.className = 'floating-label';
  label.textContent = text;
  label.style.left = x + 'px';
  label.style.top = (y - 30) + 'px';
  document.body.appendChild(label);
  setTimeout(() => { label.style.opacity = '0'; setTimeout(() => label.remove(), 600); }, 2000);
}

function jumpToCountry(id) {
  const features = topojson.feature(worldData, worldData.objects.countries).features;
  const target = features.find(f => +f.id === id);
  if (!target) return;
  const centroid = d3.geoCentroid(target);
  const wrap = document.getElementById('map-wrap');

  svgEl.transition().duration(1200).ease(d3.easeCubicInOut).call(
    zoom.transform,
    d3.zoomIdentity.translate(wrap.clientWidth/2, wrap.clientHeight/2).scale(3.5).translate(-proj(centroid)[0], -proj(centroid)[1])
  );

  const [x, y] = proj(centroid);
  const ping = gPaths.append('circle').attr('cx', x).attr('cy', y).attr('r', 0).attr('fill', 'none').attr('stroke', varColor(id)).attr('stroke-width', 2);
  ping.transition().duration(1000).attr('r', 60).attr('stroke-width', 0).remove();
}

function varColor(id) {
  const v = cmap[id];
  return v === 'vf' ? '#10B981' : v === 'voa' ? '#F59E0B' : '#EF4444';
}

function initSearch() {
  const input = document.getElementById('csearch');
  const res = document.getElementById('search-results');
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    res.innerHTML = '';
    if (val.length < 2) { res.style.display = 'none'; return; }
    const matches = Object.entries(N).filter(([id, name]) => name.toLowerCase().includes(val)).slice(0, 5);
    if (matches.length > 0) {
      res.style.display = 'block';
      matches.forEach(([id, name]) => {
        const d = document.createElement('div'); d.className = 'res-item'; d.textContent = name;
        d.onclick = () => { jumpToCountry(+id); res.style.display = 'none'; input.value = ''; };
        res.appendChild(d);
      });
    }
  });
}

function updateAll() { buildMap(); renderCard(); drawCountries(true); }

async function boot() {
  populateSel(); buildMap(); renderCard(); initSearch();
  try {
    const r = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    worldData = await r.json();
    await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
    initMap();
    document.getElementById('loading').style.display = 'none';
  } catch (err) { document.getElementById('loading').textContent = "ERROR: UPLINK FAILED"; }
}

const CLR = { vf: '#10B981', voa: '#F59E0B', req: '#1E293B', home: '#3B82F6' };
boot();
