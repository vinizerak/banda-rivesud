<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Banda Rive-Sud</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0d0d0d; --surface: rgba(255,255,255,0.07); --border: rgba(255,255,255,0.12);
  --text: #ffffff; --muted: rgba(255,255,255,0.5); --accent: #ffffff;
  --accent-light: rgba(255,255,255,0.1); --accent-mid: rgba(255,255,255,0.7);
}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body { font-family: 'DM Sans', sans-serif; color: #fff; min-height: 100vh; font-size: 15px; line-height: 1.5; background: #0d0d0d; }

/* NAV GLOBAL */
#other-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: none; align-items: center; justify-content: space-between; padding: 12px 20px; background: rgba(0,0,0,0.45); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 0.5px solid rgba(255,255,255,0.08); }
#other-nav.visible { display: flex; }
.other-nav-title { font-family: 'Instrument Serif', serif; font-size: 17px; color: rgba(255,255,255,0.9); }
.other-nav-pills { display: flex; gap: 4px; }
.other-nav-pill { height: 32px; padding: 0 13px; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 99px; color: rgba(255,255,255,0.6); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
.other-nav-pill.active { background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.35); }

.content { padding: 0; max-width: 600px; margin: 0 auto; }
.panel { display: none; }
.panel.active { display: block; }

/* ═══ ABA MÚSICAS ═══ */
#panel-repertorio { position: fixed; inset: 0; z-index: 1; overflow: hidden; }
#panel-repertorio.active { display: block; }

#cf-fullbg { position: absolute; inset: 0; background-size: cover; background-position: center; transition: background-image 0.6s ease, opacity 0.6s ease; filter: blur(28px) brightness(0.7); transform: scale(1.12); opacity: 0; }
#cf-fullbg-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.35) 100%); }
#cf-fullbg-color { position: absolute; inset: 0; transition: background 0.7s ease; opacity: 0.6; }

#cf-nav-bar { position: absolute; top: 0; left: 0; right: 0; z-index: 50; background: rgba(0,0,0,0.35); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 0.5px solid rgba(255,255,255,0.08); padding: 10px 14px 12px; }
.cf-nav-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.cf-nav-title { font-family: 'Instrument Serif', serif; font-size: 17px; color: rgba(255,255,255,0.9); }
.cf-nav-pills { display: flex; gap: 4px; }
.cf-nav-pill { height: 32px; padding: 0 13px; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 99px; color: rgba(255,255,255,0.6); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
.cf-nav-pill.active { background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.35); }
.cf-search-row { display: flex; gap: 8px; }
.cf-search-input { flex: 1; height: 38px; padding: 0 14px; background: rgba(255,255,255,0.1); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #fff; outline: none; }
.cf-search-input::placeholder { color: rgba(255,255,255,0.35); }
.cf-search-input:focus { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.14); }
.cf-filter-btn { height: 38px; padding: 0 12px; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.18); border-radius: 10px; font-size: 12px; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.55); cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.cf-filter-btn.on { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); color: #fff; font-weight: 500; }

#cf-count-badge { position: absolute; top: 108px; right: 16px; z-index: 30; font-size: 11px; color: rgba(255,255,255,0.22); }

#cf-cards { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); margin-top: 20px; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 10; }

.cf-card { position: absolute; border-radius: 16px; overflow: hidden; cursor: pointer; pointer-events: all; transition: all 0.42s cubic-bezier(0.25,0.46,0.45,0.94); }
.cf-card-size      { width: min(56vw, 260px); height: min(56vw, 260px); }
.cf-card-size-side { width: min(32vw, 150px); height: min(32vw, 150px); }
.cf-card.pos-center { z-index: 10; transform: translateX(0) scale(1); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
.cf-card.pos-left   { z-index: 5; transform: translateX(calc(-1 * min(50vw, 230px))) scale(1); filter: brightness(0.4); }
.cf-card.pos-right  { z-index: 5; transform: translateX(min(50vw, 230px)) scale(1); filter: brightness(0.4); }
.cf-card.pos-hidden-left  { z-index: 1; transform: translateX(calc(-1 * min(85vw,400px))); opacity: 0; pointer-events: none; }
.cf-card.pos-hidden-right { z-index: 1; transform: translateX(min(85vw,400px)); opacity: 0; pointer-events: none; }
.cf-cover-img { position: absolute; inset: 0; background-size: cover; background-position: center; }
.cf-cover-fallback { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: clamp(28px,12vw,52px); font-weight: 500; color: rgba(255,255,255,0.25); }
.cf-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%); }
.cf-plays-badge { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border: 0.5px solid rgba(255,255,255,0.25); border-radius: 99px; padding: 3px 9px; font-size: 11px; font-weight: 500; color: white; }

@keyframes cf-enter-right { from{transform:translateX(min(50vw,230px)) scale(0.58);opacity:0.6;}to{transform:translateX(0) scale(1);opacity:1;} }
@keyframes cf-enter-left  { from{transform:translateX(calc(-1 * min(50vw,230px))) scale(0.58);opacity:0.6;}to{transform:translateX(0) scale(1);opacity:1;} }
.cf-card.anim-enter-right { animation: cf-enter-right 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
.cf-card.anim-enter-left  { animation: cf-enter-left  0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }

/* Container inferior — espaçamento equidistante */
#cf-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0; z-index: 21;
  display: flex; flex-direction: column; align-items: center;
  padding: 0 0 clamp(16px, 4vh, 32px);
  gap: clamp(12px, 3vh, 22px);
  pointer-events: none;
}
#cf-dots { display: flex; justify-content: center; gap: 5px; flex-wrap: wrap; max-width: 200px; }
.cf-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.3); transition: all 0.3s; cursor: pointer; pointer-events: all; }
.cf-dot.active { background: #fff; width: 14px; border-radius: 3px; }

#cf-song-info { text-align: center; padding: 0 24px; width: 100%; }
#cf-song-name { font-size: clamp(18px,5vw,26px); font-weight: 600; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,0.5); line-height: 1.2; }
#cf-song-artist { font-size: clamp(12px,3vw,15px); color: rgba(255,255,255,0.55); margin-top: 4px; }

/* Player strip — entre cards e nome */
#cf-player-strip { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 0 20px; width: 100%; pointer-events: all; transition: opacity 0.3s; }
#cf-player-strip.hidden { opacity: 0; pointer-events: none; }
.cfps-btn { background: none; border: none; padding: 8px; cursor: pointer; color: rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.15s; }
.cfps-btn:active { background: rgba(255,255,255,0.1); }
.cfps-btn svg { width: 22px; height: 22px; fill: currentColor; display: block; }
.cfps-play { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.13); border: 0.5px solid rgba(255,255,255,0.28); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s; flex-shrink: 0; }
.cfps-play:active { background: rgba(255,255,255,0.22); }
.cfps-play svg { width: 15px; height: 15px; fill: #fff; display: block; }
.cfps-scrubber { flex: 1; max-width: 180px; display: flex; flex-direction: column; gap: 3px; }
.cfps-bar-wrap { position: relative; height: 20px; display: flex; align-items: center; cursor: pointer; }
.cfps-bar { width: 100%; height: 3px; background: rgba(255,255,255,0.2); border-radius: 99px; pointer-events: none; }
.cfps-fill { height: 100%; background: rgba(255,255,255,0.85); border-radius: 99px; position: relative; pointer-events: none; transition: width 0.5s linear; }
.cfps-fill::after { content:''; position: absolute; right: -5px; top: 50%; transform: translateY(-50%); width: 11px; height: 11px; border-radius: 50%; background: #fff; }
.cfps-times { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.35); }

/* Sheet */
#cf-sheet { position: absolute; inset: 0; z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; pointer-events: none; opacity: 0; transition: opacity 0.25s; }
#cf-sheet.open { pointer-events: all; opacity: 1; }
#cf-sheet-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
#cf-sheet-body { position: relative; width: 100%; max-width: 560px; max-height: 88vh; background: #0e1510; border-radius: 24px 24px 0 0; border-top: 0.5px solid rgba(255,255,255,0.12); display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94); overflow: hidden; }
#cf-sheet.open #cf-sheet-body { transform: translateY(0); }
.sheet-drag-handle { width: 36px; height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; margin: 12px auto 0; flex-shrink: 0; cursor: grab; }
.sheet-header { display: flex; align-items: center; gap: 14px; padding: 12px 20px 0; flex-shrink: 0; }
.sheet-cover-thumb { width: 56px; height: 56px; border-radius: 10px; background-size: cover; background-position: center; flex-shrink: 0; }
.sheet-header-info { flex: 1; min-width: 0; }
.sheet-song-name { font-size: 17px; font-weight: 600; color: #fff; line-height: 1.25; }
.sheet-song-artist { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 2px; }
.sheet-stats { display: flex; gap: 8px; padding: 14px 20px 0; flex-shrink: 0; }
.sheet-stat { flex: 1; background: rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 8px; text-align: center; }
.sheet-stat-val { font-size: 18px; font-weight: 600; color: #fff; line-height: 1; }
.sheet-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 3px; }
.sheet-hist-label { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.06em; padding: 14px 20px 6px; flex-shrink: 0; }
.sheet-hist-scroll { flex: 1; overflow-y: auto; padding: 0 20px; min-height: 0; -webkit-overflow-scrolling: touch; }
.sheet-hist-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 0.5px solid rgba(255,255,255,0.07); font-size: 13px; }
.sheet-hist-item:last-child { border-bottom: none; }
.shi-date { color: rgba(255,255,255,0.4); font-size: 12px; }
.shi-leader { color: #fff; font-weight: 500; }
.shi-tom { background: rgba(255,255,255,0.08); border-radius: 5px; padding: 2px 7px; font-size: 11px; color: rgba(255,255,255,0.5); }
.sheet-actions { display: flex; flex-direction: column; gap: 8px; padding: 14px 20px 28px; flex-shrink: 0; }
.sheet-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 8px; border-radius: 12px; border: 0.5px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.07); font-size: 13px; font-weight: 500; color: #fff; cursor: pointer; transition: background 0.15s; text-decoration: none; font-family: 'DM Sans', sans-serif; }
.sheet-btn:hover { background: rgba(255,255,255,0.13); }
.sheet-btn.disabled { opacity: 0.3; pointer-events: none; }

/* ═══ ABA CULTOS ═══ */
#panel-cultos { position: fixed; inset: 0; z-index: 1; overflow: hidden; padding: 0; }
#panel-cultos.active { display: block; }
#c-bg { position: absolute; inset: 0; background: linear-gradient(160deg,#0d1225 0%,#0d0d0d 100%); transition: background 0.8s ease; z-index: 0; }
#c-bg-blur { position: absolute; inset: -10%; opacity: 0.35; filter: blur(60px); transition: background 0.8s ease; transform: scale(1.1); z-index: 1; pointer-events: none; }
#c-bg-overlay { position: absolute; inset: 0; background: linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.1) 25%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0.75) 100%); z-index: 2; pointer-events: none; }

/* stats — nav tem 56px, stats logo abaixo */
#c-stats { position: fixed; top: 56px; left: 0; right: 0; z-index: 110; display: none; justify-content: center; padding: 6px 12px; gap: 0; }
#c-stats.vis { display: flex; }
.c-seg { flex: 1; max-width: 96px; text-align: center; padding: 5px 4px; background: rgba(0,0,0,0.32); backdrop-filter: blur(14px); border: 0.5px solid rgba(255,255,255,0.09); border-right: none; }
.c-seg:first-child { border-radius: 10px 0 0 10px; }
.c-seg:last-child  { border-radius: 0 10px 10px 0; border-right: 0.5px solid rgba(255,255,255,0.09); }
.c-seg.btn { cursor: pointer; }
.c-seg.btn:hover { background: rgba(255,255,255,0.07); }
.c-sv { font-size: 14px; font-weight: 700; line-height: 1; color: #fff; }
.c-sl { font-size: 8px; color: rgba(255,255,255,0.38); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

/* months — abaixo dos stats (56 nav + ~46 stats = 102) */
#c-months { position: fixed; top: 102px; left: 0; right: 0; z-index: 110; display: none; gap: 6px; padding: 4px 14px; overflow-x: auto; scrollbar-width: none; justify-content: center; }
#c-months.vis { display: flex; }
#c-months::-webkit-scrollbar { display: none; }
.c-mpill { flex-shrink: 0; height: 26px; padding: 0 11px; background: rgba(255,255,255,0.07); border: 0.5px solid rgba(255,255,255,0.12); border-radius: 99px; font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.45); cursor: pointer; transition: all 0.22s; white-space: nowrap; }
.c-mpill.active { background: rgba(255,255,255,0.2); color: #fff; border-color: rgba(255,255,255,0.38); }

/* carousel — abaixo dos months (102 + ~34 = 136) */
#c-stage { position: fixed; left: 0; right: 0; z-index: 20; top: 136px; height: min(150px,40vw); display: none; align-items: center; justify-content: center; overflow: visible; }
#c-stage.vis { display: flex; }
#c-cards { position: relative; width: 100%; height: 100%; overflow: visible; }
.cc { position: absolute; top: 0; left: 50%; margin-left: calc(min(220px,62vw) / -2); width: min(220px,62vw); height: min(150px,40vw); border-radius: 18px; overflow: hidden; cursor: pointer; transition: transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.42s ease, opacity 0.42s ease; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.18); backdrop-filter: blur(24px); }
.cc.pos-c { transform: translateX(0) scale(1); filter: brightness(1); z-index: 10; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
.cc.pos-l { transform: translateX(-148px) scale(0.82); filter: brightness(0.45); z-index: 5; }
.cc.pos-r { transform: translateX(148px) scale(0.82); filter: brightness(0.45); z-index: 5; }
.cc.pos-hl { transform: translateX(-320px) scale(0.6); opacity: 0; z-index: 1; pointer-events: none; }
.cc.pos-hr { transform: translateX(320px) scale(0.6); opacity: 0; z-index: 1; pointer-events: none; }
.cc-tint { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 60%); }
.cc-body { width: 100%; height: 100%; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between; }
.cc-top { display: flex; align-items: flex-start; gap: 8px; }
.cc-day { font-size: 38px; font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: rgba(255,255,255,0.95); }
.cc-meta { display: flex; flex-direction: column; padding-top: 4px; }
.cc-dow { font-size: 8px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.07em; }
.cc-myr { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.65); margin-top: 2px; }
.cc-leader { font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cc-count { font-size: 8px; color: rgba(255,255,255,0.38); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

/* info/dots culto */
#c-info { position: fixed; left: 0; right: 0; z-index: 20; top: calc(136px + min(150px,40vw) + 6px); display: none; flex-direction: column; align-items: center; gap: 4px; }
#c-info.vis { display: flex; }
#c-pos { font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 0.04em; }
#c-dots { display: flex; gap: 5px; }
.c-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.25); transition: all 0.3s; cursor: pointer; }
.c-dot.active { width: 14px; border-radius: 3px; background: rgba(255,255,255,0.9); }

/* song list — ocupa espaço restante sem scroll */
#c-song-stage {
  position: fixed; left: 0; right: 0; z-index: 20;
  top: calc(136px + min(150px,40vw) + 44px);
  bottom: 0;
  display: none; flex-direction: column; align-items: center;
  padding: 0 12px 10px;
  overflow: hidden; /* SEM scroll */
}
#c-song-stage.vis { display: flex; }
#c-song-list { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 4px; flex: 1; }

/* items compactos */
.csl-item { background: rgba(0,0,0,0.35); backdrop-filter: blur(18px); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 11px; padding: 8px 12px; cursor: pointer; transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94); flex: 1; display: flex; flex-direction: column; justify-content: center; min-height: 0; }
.csl-item.active { background: rgba(0,0,0,0.52); border-color: rgba(255,255,255,0.22); padding: 10px 14px; flex: 1.6; }
.csl-compact { display: flex; align-items: center; gap: 8px; }
.csl-num { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.2); width: 16px; flex-shrink: 0; text-align: right; }
.csl-item.active .csl-num { color: rgba(255,255,255,0.5); }
.csl-name { flex: 1; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.csl-item.active .csl-name { color: #fff; font-size: 15px; font-weight: 600; white-space: normal; }
.csl-tom-badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.1); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 2px 7px; color: rgba(255,255,255,0.6); flex-shrink: 0; }
.csl-item.active .csl-tom-badge { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); color: #fff; }
.csl-expanded { max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s ease; opacity: 0; }
.csl-item.active .csl-expanded { max-height: 40px; opacity: 1; }
.csl-artist { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 3px; padding-left: 24px; }

/* player bar cultos */
#c-player-bar { width: 100%; max-width: 520px; flex-shrink: 0; margin-top: 6px; background: rgba(255,255,255,0.07); border: 0.5px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 10px 14px; display: none; flex-direction: column; gap: 8px; }
#c-player-bar.vis { display: flex; }
.cpb-top { display: flex; align-items: center; gap: 12px; }
.cpb-info { flex: 1; min-width: 0; }
.cpb-name { font-size: 12px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cpb-artist { font-size: 10px; color: rgba(255,255,255,0.38); margin-top: 1px; }
.cpb-ctrl-row { display: flex; align-items: center; gap: 10px; }
.cpb-btn { background: none; border: none; padding: 6px; cursor: pointer; color: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.15s; flex-shrink: 0; }
.cpb-btn:active { background: rgba(255,255,255,0.1); }
.cpb-btn svg { width: 18px; height: 18px; fill: currentColor; display: block; }
.cpb-play { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.15); border: 0.5px solid rgba(255,255,255,0.28); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s; flex-shrink: 0; }
.cpb-play:active { background: rgba(255,255,255,0.28); }
.cpb-play svg { width: 12px; height: 12px; fill: #fff; display: block; }
.cpb-scrubber { display: flex; flex-direction: column; gap: 3px; }
.cpb-bar-wrap { position: relative; height: 18px; display: flex; align-items: center; cursor: pointer; }
.cpb-bar { width: 100%; height: 3px; background: rgba(255,255,255,0.16); border-radius: 99px; pointer-events: none; }
.cpb-fill { height: 100%; background: rgba(255,255,255,0.8); border-radius: 99px; position: relative; transition: width 0.5s linear; pointer-events: none; }
.cpb-fill::after { content:''; position: absolute; right: -5px; top: 50%; transform: translateY(-50%); width: 10px; height: 10px; border-radius: 50%; background: #fff; pointer-events: none; }
.cpb-times { display: flex; justify-content: space-between; font-size: 9px; color: rgba(255,255,255,0.3); }

#c-fab { position: fixed; bottom: 20px; right: 18px; z-index: 115; width: 46px; height: 46px; border-radius: 50%; background: #fff; color: #0d0d0d; font-size: 24px; font-weight: 300; border: none; cursor: pointer; display: none; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.55); transition: transform 0.25s; }
#c-fab.vis { display: flex; }
#c-fab.open { transform: rotate(45deg); }

#c-sh-ov { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); opacity: 0; pointer-events: none; transition: opacity 0.3s; }
#c-sh-ov.open { opacity: 1; pointer-events: all; }
#c-sh { position: fixed; bottom: 0; left: 0; right: 0; z-index: 210; max-width: 600px; margin: 0 auto; background: #141414; border-radius: 22px 22px 0 0; border-top: 0.5px solid rgba(255,255,255,0.16); transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); max-height: 92vh; display: flex; flex-direction: column; }
#c-sh.open { transform: translateY(0); }
.c-sh-hand { width: 36px; height: 4px; background: rgba(255,255,255,0.14); border-radius: 2px; margin: 14px auto 0; flex-shrink: 0; }
.c-sh-hdr { padding: 14px 20px 0; flex-shrink: 0; }
.c-sh-title { font-family: 'Instrument Serif', serif; font-size: 22px; color: #fff; }
.c-sh-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 3px; }
.c-sh-body { flex: 1; overflow-y: auto; padding: 16px 20px 28px; min-height: 0; }
.c-pend-item { display: flex; align-items: center; gap: 9px; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 9px 12px; margin-bottom: 6px; }
.c-pend-num { font-size: 11px; color: rgba(255,255,255,0.25); width: 16px; flex-shrink: 0; }
.c-pend-name { flex: 1; font-size: 13px; font-weight: 500; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.c-pend-tom { width: 50px; height: 30px; text-align: center; background: rgba(255,255,255,0.07); border: 0.5px solid rgba(255,255,255,0.16); border-radius: 7px; font-size: 12px; font-family: 'DM Sans', sans-serif; color: #fff; outline: none; }
.c-pend-rm { background: none; border: none; color: rgba(255,255,255,0.35); font-size: 18px; cursor: pointer; line-height: 1; }
.c-pend-rm:hover { color: #ff6b6b; }
.c-add-s { width: 100%; height: 40px; background: none; border: 1px dashed rgba(255,255,255,0.16); border-radius: 10px; color: rgba(255,255,255,0.38); font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; margin-bottom: 14px; transition: all 0.15s; }
.c-add-s:hover { border-color: rgba(255,255,255,0.38); color: rgba(255,255,255,0.75); }

#c-tm-ov { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); opacity: 0; pointer-events: none; transition: opacity 0.25s; display: flex; align-items: flex-end; justify-content: center; }
#c-tm-ov.open { opacity: 1; pointer-events: all; }
#c-tm-sh { background: #141414; border-radius: 22px 22px 0 0; border-top: 0.5px solid rgba(255,255,255,0.15); width: 100%; max-width: 600px; padding: 14px 20px 36px; transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
#c-tm-ov.open #c-tm-sh { transform: translateY(0); }
.c-tm-hand { width: 36px; height: 4px; background: rgba(255,255,255,0.13); border-radius: 2px; margin: 0 auto 14px; }
.c-tm-lbl { font-size: 10px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.c-tm-title { font-family: 'Instrument Serif', serif; font-size: 24px; color: #fff; margin-bottom: 2px; }
.c-tm-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 18px; }
.c-tm-row { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 11px; padding: 10px 14px; margin-bottom: 6px; }
.c-tm-rank { font-size: 11px; color: rgba(255,255,255,0.22); width: 18px; text-align: right; flex-shrink: 0; }
.c-tm-name { flex: 1; font-size: 14px; font-weight: 500; color: #fff; }
.c-tm-cnt { font-size: 11px; color: rgba(255,255,255,0.38); background: rgba(255,255,255,0.07); padding: 2px 8px; border-radius: 99px; flex-shrink: 0; }
.c-tm-close { width: 100%; height: 40px; background: rgba(255,255,255,0.06); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 10px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.45); cursor: pointer; margin-top: 12px; }

/* ═══ ABA ENSAIO ═══ */
#panel-ensaio { display: none; padding: 76px 16px 32px; }
#panel-ensaio.active { display: block; }
.ensaio-choice-row { display: flex; gap: 12px; margin-bottom: 20px; }
.ensaio-choice-card { flex: 1; border: 1.5px solid var(--border); border-radius: 14px; padding: 20px 12px 16px; background: var(--surface); cursor: pointer; text-align: center; transition: all 0.15s; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ensaio-choice-card.selected { border-color: var(--accent); background: var(--accent-light); }
.ensaio-choice-icon { font-size: 28px; }
.ensaio-choice-lbl { font-size: 14px; font-weight: 600; color: var(--text); }
.ensaio-choice-sub { font-size: 11px; color: var(--muted); }
.ensaio-choice-card.selected .ensaio-choice-lbl { color: var(--accent); }
.ensaio-culto-info { font-size: 12px; color: var(--muted); margin-bottom: 12px; padding: 0 2px; }
.ensaio-song-btn { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 13px 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; text-align: left; }
.ensaio-song-num { font-size: 11px; color: var(--muted); width: 20px; flex-shrink: 0; }
.ensaio-song-info { flex: 1; min-width: 0; }
.ensaio-song-name { font-size: 14px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ensaio-song-artist { font-size: 12px; color: var(--muted); margin-top: 1px; }
.ensaio-song-tom { font-size: 11px; font-weight: 600; color: var(--accent-mid); background: var(--accent-light); padding: 3px 9px; border-radius: 99px; flex-shrink: 0; }
.ensaio-song-arrow { font-size: 16px; color: var(--muted); flex-shrink: 0; }
.ensaio-no-culto { text-align: center; padding: 40px 20px; color: var(--muted); font-size: 14px; }

.form-row { margin-bottom: 14px; }
.form-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 5px; display: block; }
.form-input { width: 100%; height: 40px; padding: 0 14px; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.18); border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #fff; outline: none; }
.form-input::placeholder { color: rgba(255,255,255,0.3); }
.form-input:focus { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.12); }
.btn-primary { width: 100%; height: 44px; background: rgba(255,255,255,0.15); border: 0.5px solid rgba(255,255,255,0.3); border-radius: 10px; color: #fff; font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; margin-bottom: 8px; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.picker-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 300; align-items: flex-end; justify-content: center; }
.picker-overlay.open { display: flex; }
.picker-sheet { background: #1a1a1a; border-radius: 20px 20px 0 0; width: 100%; max-width: 600px; padding: 20px 16px 32px; max-height: 80vh; display: flex; flex-direction: column; border-top: 0.5px solid rgba(255,255,255,0.12); }
.picker-handle { width: 36px; height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; margin: 0 auto 16px; }
.picker-title { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #fff; }
.picker-search { width: 100%; height: 40px; padding: 0 14px; background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.18); border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #fff; outline: none; margin-bottom: 12px; }
.picker-search::placeholder { color: rgba(255,255,255,0.35); }
.picker-list { overflow-y: auto; flex: 1; }
.picker-item { padding: 11px 8px; border-bottom: 0.5px solid rgba(255,255,255,0.08); cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; }
.picker-item:hover { background: rgba(255,255,255,0.06); }
.picker-item-name { font-size: 14px; font-weight: 500; color: #fff; }
.picker-item-artist { font-size: 12px; color: rgba(255,255,255,0.45); }
.picker-item-badge { font-size: 11px; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.07); padding: 2px 7px; border-radius: 99px; flex-shrink: 0; margin-left: 8px; }
.picker-close { width: 100%; height: 42px; background: rgba(255,255,255,0.07); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.6); cursor: pointer; margin-top: 12px; }

#ensaio-fs { display: none; position: fixed; inset: 0; z-index: 500; background: #000; overflow: hidden; clip-path: inset(0 0 56px 0); }
#ensaio-fs.open { display: block; }
#ensaio-iframe { position: absolute; top: 0; left: 0; right: 0; bottom: -60px; width: 100%; height: calc(100% - 56px + 60px); border: none; display: block; }
.ensaio-no-cifra { position: absolute; top: 0; left: 0; right: 0; bottom: 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: rgba(255,255,255,0.5); font-size: 15px; text-align: center; padding: 32px; background: #0d1a08; }
.ensaio-no-cifra .icon { font-size: 40px; opacity: 0.5; }
.ensaio-ext-link { font-size: 13px; color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 8px 18px; border-radius: 99px; text-decoration: none; }
#ensaio-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 56px; background: rgba(10,20,6,0.96); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,0.08); display: none; align-items: center; z-index: 510; }
#ensaio-bar.open { display: flex; }
.ensaio-bar-btn { flex-shrink: 0; height: 56px; width: 64px; background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; -webkit-tap-highlight-color: transparent; }
.ensaio-bar-btn:active { background: rgba(255,255,255,0.1); }
.ensaio-bar-btn:disabled { opacity: 0.2; cursor: not-allowed; }
.ensaio-bar-btn.close { color: rgba(255,255,255,0.5); font-size: 18px; }
.ensaio-bar-btn.menu { color: rgba(255,255,255,0.7); font-size: 20px; }
.ensaio-bar-nome { flex: 1; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; padding: 0 4px; pointer-events: none; }
#ensaio-loading { display: none; position: fixed; inset: 0; z-index: 600; background: #0d1a08; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
#ensaio-loading.open { display: flex; }
.ensaio-loading-icon { font-size: 52px; animation: ensaio-pulse 1.6s ease-in-out infinite; }
.ensaio-loading-title { font-family: 'Instrument Serif', serif; font-size: 24px; color: #fff; }
.ensaio-loading-msg { font-size: 13px; color: rgba(255,255,255,0.4); min-height: 20px; transition: opacity 0.3s; }
.ensaio-loading-dots { display: flex; gap: 7px; margin-top: 6px; }
.ensaio-loading-dot { width: 7px; height: 7px; border-radius: 50%; background: #5DBB3A; animation: ensaio-dot 1.2s ease-in-out infinite; }
.ensaio-loading-dot:nth-child(2) { animation-delay: 0.2s; }
.ensaio-loading-dot:nth-child(3) { animation-delay: 0.4s; }
#ensaio-error { display: none; position: fixed; inset: 0; z-index: 600; background: #0d1a08; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; text-align: center; gap: 18px; overflow-y: auto; }
#ensaio-error.open { display: flex; }
.ensaio-error-icon { font-size: 52px; }
.ensaio-error-title { font-family: 'Instrument Serif', serif; font-size: 28px; color: #fff; }
.ensaio-error-desc { font-size: 15px; color: rgba(255,255,255,0.5); max-width: 360px; line-height: 1.6; }
.ensaio-error-box { width: 100%; max-width: 440px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,80,80,0.3); border-radius: 14px; padding: 18px 20px; font-family: monospace; font-size: 12px; color: #F87171; text-align: left; word-break: break-all; white-space: pre-wrap; line-height: 1.6; max-height: 220px; overflow-y: auto; }
.ensaio-error-back { margin-top: 4px; padding: 13px 32px; background: rgba(93,187,58,0.15); border: 1px solid rgba(93,187,58,0.3); color: #5DBB3A; border-radius: 99px; font-size: 15px; font-family: 'DM Sans', sans-serif; cursor: pointer; }
#ensaio-menu { display: none; position: fixed; inset: 0; z-index: 700; background: rgba(0,0,0,0.6); align-items: flex-end; justify-content: center; }
#ensaio-menu.open { display: flex; }
.ensaio-menu-sheet { background: #111d0b; border-radius: 22px 22px 0 0; width: 100%; max-width: 600px; padding: 18px 16px 40px; max-height: 75vh; overflow-y: auto; }
.ensaio-menu-handle { width: 36px; height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; margin: 0 auto 16px; }
.ensaio-menu-title { font-family: 'Instrument Serif', serif; font-size: 20px; color: #fff; margin-bottom: 14px; padding: 0 4px; }
.ensaio-menu-item { display: flex; align-items: center; gap: 14px; padding: 13px 10px; border-radius: 12px; cursor: pointer; transition: background 0.12s; }
.ensaio-menu-item.active { background: rgba(93,187,58,0.12); }
.ensaio-menu-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ensaio-menu-item.active .ensaio-menu-num { background: rgba(93,187,58,0.2); color: #5DBB3A; }
.ensaio-menu-info { flex: 1; }
.ensaio-menu-nome { font-size: 15px; font-weight: 500; color: #fff; }
.ensaio-menu-meta { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 2px; }
.ensaio-menu-playing { color: #5DBB3A; font-size: 14px; }
#holyrics-fs { display: none; position: fixed; inset: 0; z-index: 500; background: #000; }
#holyrics-iframe { position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 48px); border: none; display: block; }
.holyrics-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 48px; background: rgba(5,10,3,.97); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; z-index: 510; }

.toast { display: none; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); color: #fff; padding: 10px 20px; border-radius: 99px; font-size: 13px; z-index: 400; white-space: nowrap; max-width: 90vw; text-align: center; border: 0.5px solid rgba(255,255,255,0.2); }
.toast.show { display: block; }
.toast.erro { background: rgba(139,32,32,0.8); }

@keyframes ensaio-pulse { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.1);opacity:0.75;} }
@keyframes ensaio-dot { 0%,80%,100%{transform:scale(0.6);opacity:0.4;}40%{transform:scale(1);opacity:1;} }

@media (max-width: 420px) {
  .cf-search-row { flex-wrap: wrap; }
  .cf-search-input { min-width: 100%; }
}
</style>
</head>
<body>

<nav id="other-nav">
  <span class="other-nav-title">Rive-Sud</span>
  <div class="other-nav-pills">
    <button class="other-nav-pill" onclick="showTab('repertorio',this)">Músicas</button>
    <button class="other-nav-pill" onclick="showTab('cultos',this)">Cultos</button>
    <button class="other-nav-pill" onclick="showTab('ensaio',this)">🎸 Ensaio</button>
  </div>
</nav>

<div class="content">
<div id="panel-repertorio" class="panel active">
  <div id="cf-fullbg"></div>
  <div id="cf-fullbg-color"></div>
  <div id="cf-fullbg-overlay"></div>
  <div id="cf-nav-bar">
    <div class="cf-nav-top">
      <span class="cf-nav-title">Rive-Sud</span>
      <div class="cf-nav-pills">
        <button class="cf-nav-pill active" onclick="showTab('repertorio',this)">Músicas</button>
        <button class="cf-nav-pill" onclick="showTab('cultos',this)">Cultos</button>
        <button class="cf-nav-pill" onclick="showTab('ensaio',this)">🎸 Ensaio</button>
      </div>
    </div>
    <div class="cf-search-row">
      <input type="text" class="cf-search-input" id="search-musicas" placeholder="Buscar música ou artista..." oninput="renderMusicas()">
      <button class="cf-filter-btn" id="filter-nuncausadas" onclick="toggleFiltro()">Nunca usadas</button>
      <button class="cf-filter-btn" id="filter-recentes" onclick="toggleOrdenacao()">+ Recentes</button>
    </div>
  </div>
  <div id="cf-count-badge"></div>
  <div id="cf-cards"></div>
  <div id="cf-bottom">
    <div id="cf-player-strip" class="hidden">
      <button class="cfps-btn" onclick="gMuteToggle()">
        <svg id="cfps-mute-icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </button>
      <div class="cfps-play" onclick="gPlayPause()">
        <svg id="cfps-play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div class="cfps-scrubber">
        <div class="cfps-bar-wrap" id="cfps-bar-wrap">
          <div class="cfps-bar"><div class="cfps-fill" id="cfps-fill" style="width:0%"></div></div>
        </div>
        <div class="cfps-times"><span id="cfps-cur">0:00</span><span id="cfps-dur">0:00</span></div>
      </div>
    </div>
    <div id="cf-song-info">
      <div id="cf-song-name"></div>
      <div id="cf-song-artist"></div>
    </div>
    <div id="cf-dots"></div>
  </div>
  <div id="cf-sheet">
    <div id="cf-sheet-backdrop"></div>
    <div id="cf-sheet-body">
      <div class="sheet-drag-handle" id="cf-sheet-drag"></div>
      <div class="sheet-header">
        <div class="sheet-cover-thumb" id="cf-sheet-thumb"></div>
        <div class="sheet-header-info">
          <div class="sheet-song-name" id="cf-sheet-name"></div>
          <div class="sheet-song-artist" id="cf-sheet-artist"></div>
        </div>
      </div>
      <div class="sheet-stats" id="cf-sheet-stats"></div>
      <div class="sheet-hist-label">Histórico</div>
      <div class="sheet-hist-scroll" id="cf-sheet-hist"></div>
      <div class="sheet-actions" id="cf-sheet-actions"></div>
    </div>
  </div>
</div>

<div id="panel-cultos" class="panel">
  <div id="c-bg"></div><div id="c-bg-blur"></div><div id="c-bg-overlay"></div>
</div>

<div id="panel-ensaio" class="panel">
  <div class="ensaio-choice-row">
    <button class="ensaio-choice-card" id="choice-instrumentista" onclick="selecionarPerfil('instrumentista')">
      <span class="ensaio-choice-icon">🎸</span><span class="ensaio-choice-lbl">Instrumentista</span><span class="ensaio-choice-sub">Cifras do culto</span>
    </button>
    <button class="ensaio-choice-card" id="choice-vocalista" onclick="selecionarPerfil('vocalista')">
      <span class="ensaio-choice-icon">🎤</span><span class="ensaio-choice-lbl">Vocalista</span><span class="ensaio-choice-sub">Letras ao vivo</span>
    </button>
  </div>
  <div id="ensaio-instrumentista-area" style="display:none;">
    <div class="ensaio-culto-info" id="ensaio-culto-info"></div>
    <div id="ensaio-song-list"></div>
  </div>
</div>
</div>

<!-- CULTOS UI fixa -->
<div id="c-stats">
  <div class="c-seg"><div class="c-sv" id="c-sv-tot">—</div><div class="c-sl">cultos</div></div>
  <div class="c-seg"><div class="c-sv" id="c-sv-uniq">—</div><div class="c-sl">músicas únicas</div></div>
  <div class="c-seg"><div class="c-sv" id="c-sv-lead">—</div><div class="c-sl">ministra(o)s</div></div>
  <div class="c-seg btn" onclick="cAbrirTopMes()"><div class="c-sv" id="c-sv-top" style="font-size:10px;line-height:1.3;text-align:center;">—</div><div class="c-sl">top mês ›</div></div>
</div>
<div id="c-months"></div>
<div id="c-stage"><div id="c-cards"></div></div>
<div id="c-info"><div id="c-pos"></div><div id="c-dots"></div></div>
<div id="c-song-stage">
  <div id="c-song-list"></div>
  <div id="c-player-bar">
    <div class="cpb-top">
      <div class="cpb-info"><div class="cpb-name" id="cpb-name">—</div><div class="cpb-artist" id="cpb-artist"></div></div>
      <div class="cpb-ctrl-row">
        <button class="cpb-btn" onclick="gMuteToggle()"><svg id="cpb-mute-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></button>
        <div class="cpb-play" onclick="gPlayPause()"><svg id="cpb-play-icon" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
    </div>
    <div class="cpb-scrubber">
      <div class="cpb-bar-wrap" id="cpb-bar-wrap"><div class="cpb-bar"><div class="cpb-fill" id="cpb-fill" style="width:0%"></div></div></div>
      <div class="cpb-times"><span id="cpb-cur">0:00</span><span id="cpb-dur">0:00</span></div>
    </div>
  </div>
</div>
<button id="c-fab" onclick="cToggleSheet()">+</button>

<div id="c-sh-ov" onclick="if(event.target===this)cFecharSheet()"></div>
<div id="c-sh">
  <div class="c-sh-hand"></div>
  <div class="c-sh-hdr"><div class="c-sh-title">Novo culto</div><div class="c-sh-sub">Preencha e salve na planilha</div></div>
  <div class="c-sh-body">
    <div class="form-row"><label class="form-label">Data</label><input type="text" class="form-input" id="c-data" placeholder="ex: 27/04/2025"></div>
    <div class="form-row"><label class="form-label">Ministra(o)</label><input type="text" class="form-input" id="c-ministra" placeholder="Nome"></div>
    <div class="form-row">
      <label class="form-label">Músicas <span id="c-pend-ct" style="font-weight:400;text-transform:none;letter-spacing:0;color:rgba(255,255,255,0.28);font-size:11px;"></span></label>
      <div id="c-pend-list"></div>
      <button class="c-add-s" onclick="abrirPicker()">+ Adicionar música</button>
    </div>
    <button class="btn-primary" id="c-btn-save" onclick="salvarCulto()">Salvar culto na planilha</button>
  </div>
</div>
<div id="c-tm-ov" onclick="if(event.target===this)cFecharTopMes()">
  <div id="c-tm-sh">
    <div class="c-tm-hand"></div><div class="c-tm-lbl">Este mês</div>
    <div class="c-tm-title" id="c-tm-title">—</div><div class="c-tm-sub" id="c-tm-sub"></div>
    <div id="c-tm-rows"></div>
    <button class="c-tm-close" onclick="cFecharTopMes()">Fechar</button>
  </div>
</div>

<div id="ensaio-fs"><iframe id="ensaio-iframe" allowfullscreen></iframe><div id="ensaio-no-cifra-msg" class="ensaio-no-cifra" style="display:none;"></div></div>
<div id="ensaio-bar">
  <button class="ensaio-bar-btn close" onclick="fecharEnsaio()">✕</button>
  <button class="ensaio-bar-btn" id="ensaio-prev" onclick="navegarEnsaio(-1)">‹</button>
  <div class="ensaio-bar-nome" id="ensaio-bar-nome"></div>
  <button class="ensaio-bar-btn" id="ensaio-next" onclick="navegarEnsaio(1)">›</button>
  <button class="ensaio-bar-btn menu" onclick="abrirMenuEnsaio()">☰</button>
</div>
<div id="holyrics-fs">
  <iframe id="holyrics-iframe" src=""></iframe>
  <div class="holyrics-bar">
    <button onclick="fecharHolyrics()" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:14px;cursor:pointer;font-family:'DM Sans',sans-serif;">✕ Fechar</button>
    <div style="font-size:11px;color:rgba(255,255,255,.25);background:rgba(255,255,255,.06);padding:3px 10px;border-radius:99px;">Holyrics ao vivo</div>
  </div>
</div>
<div id="ensaio-menu" onclick="if(event.target===this)fecharMenuEnsaio()">
  <div class="ensaio-menu-sheet">
    <div class="ensaio-menu-handle"></div><div class="ensaio-menu-title">Setlist</div>
    <div id="ensaio-menu-list"></div>
  </div>
</div>
<div id="ensaio-loading">
  <div class="ensaio-loading-icon">🎸</div>
  <div class="ensaio-loading-title">Preparando o ensaio...</div>
  <div class="ensaio-loading-msg" id="ensaio-loading-msg">Carregando...</div>
  <div class="ensaio-loading-dots"><div class="ensaio-loading-dot"></div><div class="ensaio-loading-dot"></div><div class="ensaio-loading-dot"></div></div>
</div>
<div id="ensaio-error">
  <div class="ensaio-error-icon">😬</div>
  <div class="ensaio-error-title">Algo deu errado</div>
  <div class="ensaio-error-desc">Não foi possível carregar o ensaio.</div>
  <div class="ensaio-error-box" id="ensaio-error-box"></div>
  <div style="font-size:13px;color:rgba(255,255,255,0.35);padding:14px 18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:100%;max-width:440px;">📲 Vinicius, copia o erro acima!</div>
  <button class="ensaio-error-back" onclick="fecharErroEnsaio()">← Voltar</button>
</div>
<div class="picker-overlay" id="picker-overlay" onclick="fecharPickerSeFora(event)">
  <div class="picker-sheet">
    <div class="picker-handle"></div>
    <div class="picker-title">Adicionar música ao culto</div>
    <input type="text" class="picker-search" id="picker-search" placeholder="Buscar música..." oninput="renderPicker()">
    <div class="picker-list" id="picker-list"></div>
    <button class="picker-close" onclick="fecharPicker()">Fechar</button>
  </div>
</div>
<div id="toast" class="toast"></div>

<script>
const CSV_MUSICAS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9PvhKg7QA7nAUXvDm3sz2d7PfD1RBL-oJb-1ML1bLzS3onWoUQowJtWdMGlvVJ_Y51CRr8W84ntcV/pub?gid=1727049692&single=true&output=csv';
const CSV_CULTOS  = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9PvhKg7QA7nAUXvDm3sz2d7PfD1RBL-oJb-1ML1bLzS3onWoUQowJtWdMGlvVJ_Y51CRr8W84ntcV/pub?gid=541921551&single=true&output=csv';
const SCRIPT_URL  = 'https://script.google.com/macros/s/AKfycbxYPaH_K7SQsKLuLzmqaqtPTO3szsPJwkzxLxquy_m9KOiCO-UkV0EuL-nMnEnrmBBNGA/exec';

let musicas = [], cultos = [], cultoPendente = [];
let filtroNuncaUsadas = false, ordenarPorRecente = false;

// ══ PLAYER GLOBAL ══
const gPlayer = {
  audio: null, url: null, muted: false, nome: '', artista: '',
  play(url, nome, artista) {
    if (this.audio) { this.audio.pause(); this.audio.src = ''; }
    this.url = url; this.nome = nome; this.artista = artista;
    this.audio = new Audio(url);
    this.audio.muted = this.muted;
    this.audio.play().catch(()=>{});
    this.audio.addEventListener('timeupdate', ()=>this._updateUI());
    this.audio.addEventListener('loadedmetadata', ()=>this._updateUI());
    this.audio.addEventListener('ended', ()=>{ this._updatePlayIcons(false); this._setScrubbers(0,0,0); });
    this._showUI(); this._updateUI();
  },
  stop() { if (this.audio) { this.audio.pause(); this.audio.src = ''; this.audio = null; } this.url = null; document.getElementById('cf-player-strip').classList.add('hidden'); document.getElementById('c-player-bar').classList.remove('vis'); },
  togglePlayPause() { if (!this.audio) return; if (this.audio.paused) this.audio.play(); else this.audio.pause(); this._updatePlayIcons(!this.audio.paused); },
  muteToggle() { this.muted = !this.muted; if (this.audio) this.audio.muted = this.muted; this._updateMuteIcons(); },
  seekTo(ratio) { if (!this.audio || !this.audio.duration) return; this.audio.currentTime = this.audio.duration * ratio; },
  _showUI() {
    document.getElementById('cf-player-strip').classList.remove('hidden');
    document.getElementById('cpb-name').textContent   = this.nome;
    document.getElementById('cpb-artist').textContent = this.artista;
    document.getElementById('c-player-bar').classList.add('vis');
    this._updateMuteIcons(); this._updatePlayIcons(true);
  },
  _updatePlayIcons(playing) {
    const svg = playing ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>';
    document.getElementById('cfps-play-icon').innerHTML = svg;
    document.getElementById('cpb-play-icon').innerHTML  = svg;
  },
  _updateMuteIcons() {
    const on  = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>';
    const off = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
    const svg = this.muted ? off : on;
    document.getElementById('cfps-mute-icon').innerHTML = svg;
    document.getElementById('cpb-mute-icon').innerHTML  = svg;
  },
  _updateUI() {
    if (!this.audio) return;
    const cur = this.audio.currentTime||0, dur = this.audio.duration||0;
    this._setScrubbers(dur>0?(cur/dur)*100:0, cur, dur);
    this._updatePlayIcons(!this.audio.paused);
  },
  _setScrubbers(pct, cur, dur) {
    const fmt = s=>{ const m=Math.floor(s/60),ss=Math.floor(s%60); return `${m}:${ss<10?'0':''}${ss}`; };
    document.getElementById('cfps-fill').style.width = pct+'%';
    document.getElementById('cfps-cur').textContent  = fmt(cur);
    document.getElementById('cfps-dur').textContent  = fmt(dur);
    document.getElementById('cpb-fill').style.width  = pct+'%';
    document.getElementById('cpb-cur').textContent   = fmt(cur);
    document.getElementById('cpb-dur').textContent   = fmt(dur);
  }
};
function gPlayPause()  { gPlayer.togglePlayPause(); }
function gMuteToggle() { gPlayer.muteToggle(); }

// ══ DADOS ══
function parseDataBR(d) {
  const p=d.split('/'); if(p.length!==3) return new Date(0);
  let ano=parseInt(p[2]); if(ano<100) ano+=2000;
  return new Date(ano, parseInt(p[1])-1, parseInt(p[0]));
}
function parseCSVLine(ln) {
  const C=[]; let v='',inQ=false;
  for(let i=0;i<ln.length;i++){const ch=ln[i],nx=ln[i+1];if(ch==='"'){if(inQ&&nx==='"'){v+='"';i++;}else inQ=!inQ;}else if(ch===','&&!inQ){C.push(v);v='';}else v+=ch;}
  C.push(v); return C.map(s=>s.trim());
}
function parseCSVMusicas(txt) {
  return txt.trim().split('\n').slice(3).map((ln,idx)=>{
    const [nome,artista,cifra,usos,midia]=parseCSVLine(ln);
    return {nome:nome||'',artista:artista||'',cifra:cifra||'',usos:parseInt(usos)||0,midia:midia||'',ordemOriginal:idx};
  }).filter(m=>m.nome).sort((a,b)=>b.usos-a.usos||a.nome.localeCompare(b.nome));
}
function parseCSVCultos(txt) {
  const grupos={};
  txt.trim().split('\n').slice(1).forEach(ln=>{
    const [data,musica,tom,ministra,usos,mp3]=parseCSVLine(ln);
    if(!data||!musica)return;
    if(!grupos[data])grupos[data]={data,ministra:ministra||'',musicas:[]};
    grupos[data].musicas.push({nome:musica,tom:tom||'',usos:parseInt(usos)||0,mp3:mp3||''});
  });
  return Object.values(grupos).sort((a,b)=>parseDataBR(b.data)-parseDataBR(a.data));
}
function resolveAudioUrl(raw) {
  if(!raw)return null;
  if(raw.includes('cloudinary.com'))return raw;
  const m=raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if(m)return`https://drive.google.com/uc?export=download&id=${m[1]}`;
  if(raw.startsWith('http'))return raw;
  return null;
}
async function carregarDados() {
  try {
    const [m,c]=await Promise.all([fetch(CSV_MUSICAS).then(r=>r.text()),fetch(CSV_CULTOS).then(r=>r.text())]);
    musicas=parseCSVMusicas(m); cultos=parseCSVCultos(c);
    renderMusicas(); renderCultos();
  } catch(e){ toast('Erro ao carregar planilha.',true); }
}

// ══ COVERFLOW ══
let cfLista=[], cfIdx=0, cfCovers={}, cfPreviewAtual=null;
const CF_GRADIENTS=[
  ['#0a3d62','#1D9E75'],['#1a1a2e','#534AB7'],['#2d1b00','#EF9F27'],
  ['#2d0a0a','#E24B4A'],['#0d2137','#378ADD'],['#1a2e0a','#639922'],
  ['#2a0a2a','#D4537E'],['#0a2a2a','#1D9E75'],['#1a0a1a','#B7509E'],
];
function cfGrad(n){let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;return CF_GRADIENTS[Math.abs(h)%CF_GRADIENTS.length];}
function cfInit(n){return n.split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'♪';}

async function cfBuscarCapa(m) {
  const k=m.nome+'|'+m.artista;
  if(cfCovers[k]!==undefined)return cfCovers[k];
  cfCovers[k]=null;
  try{
    const r=await Promise.race([
      fetch(`/.netlify/functions/itunes?q=${encodeURIComponent((m.nome+' '+m.artista).trim())}`),
      new Promise((_,rej)=>setTimeout(()=>rej(),5000))
    ]);
    const d=await r.json();
    if(d.results?.length>0){
      const it=d.results[0];
      cfCovers[k]={img:(it.artworkUrl100||'').replace('100x100bb','400x400bb'),preview:it.previewUrl||null};
      return cfCovers[k];
    }
  }catch(e){}
  cfCovers[k]={img:null,preview:null}; return cfCovers[k];
}

// Toca preview automaticamente ao navegar
async function cfTocarPreview() {
  if(!cfLista.length)return;
  const m=cfLista[cfIdx];
  const cover=cfCovers[m.nome+'|'+m.artista] || await cfBuscarCapa(m);
  // só toca se ainda estamos na mesma música
  if(cfLista[cfIdx]!==m) return;
  if(cover?.preview) {
    gPlayer.play(cover.preview, m.nome, m.artista||'');
  }
}

function toggleFiltro(){filtroNuncaUsadas=!filtroNuncaUsadas;document.getElementById('filter-nuncausadas').classList.toggle('on',filtroNuncaUsadas);renderMusicas();}
function toggleOrdenacao(){ordenarPorRecente=!ordenarPorRecente;document.getElementById('filter-recentes').classList.toggle('on',ordenarPorRecente);renderMusicas();}

function renderMusicas() {
  const q=document.getElementById('search-musicas').value.toLowerCase();
  let lista=musicas.filter(m=>(m.nome.toLowerCase().includes(q)||m.artista.toLowerCase().includes(q))&&(!filtroNuncaUsadas||m.usos===0));
  if(ordenarPorRecente){
    lista.forEach(m=>{let ud=null;cultos.forEach(c=>{if(c.musicas.some(cm=>cm.nome.toLowerCase()===m.nome.toLowerCase())){const d=parseDataBR(c.data);if(!ud||d>ud)ud=d;}});m.ultimaData=ud;});
    lista.sort((a,b)=>{if(!a.ultimaData&&!b.ultimaData)return a.nome.localeCompare(b.nome);if(!a.ultimaData)return 1;if(!b.ultimaData)return-1;if(a.ultimaData.getTime()!==b.ultimaData.getTime())return b.ultimaData-a.ultimaData;return a.nome.localeCompare(b.nome);});
  } else lista.sort((a,b)=>b.usos-a.usos||a.nome.localeCompare(b.nome));
  cfLista=lista; cfIdx=0;
  document.getElementById('cf-count-badge').textContent=lista.length+' músicas';
  if(!lista.length){document.getElementById('cf-cards').innerHTML='';document.getElementById('cf-song-name').textContent='Nenhuma música encontrada';document.getElementById('cf-song-artist').textContent='';return;}
  cfRender(); cfPreload();
}

function cfRender(dir) {
  if(!cfLista.length)return;
  const total=cfLista.length, cont=document.getElementById('cf-cards');
  cont.innerHTML='';
  [-2,-1,0,1,2].forEach(off=>{
    const idx=(cfIdx+off+total)%total, m=cfLista[idx];
    const grad=cfGrad(m.nome), cover=cfCovers[m.nome+'|'+m.artista];
    const pos=off===0?'pos-center':off===-1?'pos-left':off===1?'pos-right':off<-1?'pos-hidden-left':'pos-hidden-right';
    const sz=off===0?'cf-card-size':'cf-card-size-side';
    let anim=''; if(dir!==undefined&&off===0) anim=dir>0?'anim-enter-right':'anim-enter-left';
    const div=document.createElement('div');
    div.className=`cf-card ${sz} ${pos} ${anim}`;
    div.innerHTML=`<div class="cf-cover-fallback" style="background:linear-gradient(135deg,${grad[0]},${grad[1]}88);">${cfInit(m.nome)}</div>${cover?.img?`<div class="cf-cover-img" style="background-image:url('${cover.img}');"></div>`:''}${off===0?`<div class="cf-overlay"></div><div class="cf-plays-badge">${m.usos} culto${m.usos!==1?'s':''}</div>`:''}`;
    if(off===0) div.addEventListener('click',()=>cfAbrirSheet(m));
    else div.addEventListener('click',()=>cfNavegar(off));
    cont.appendChild(div);
  });
  cfAtualizarBg(); cfAtualizarInfo(); cfRenderDots();
}

function cfNavegar(dir) {
  if(!cfLista.length)return;
  cfIdx=(cfIdx+dir+cfLista.length)%cfLista.length;
  cfRender(dir);
  // toca preview automaticamente
  setTimeout(()=>{ cfPreload().then(()=>cfTocarPreview()); }, 50);
}

function cfAtualizarBg() {
  if(!cfLista.length)return;
  const m=cfLista[cfIdx], cover=cfCovers[m.nome+'|'+m.artista];
  const bg=document.getElementById('cf-fullbg'), col=document.getElementById('cf-fullbg-color');
  if(cover?.img){bg.style.backgroundImage=`url('${cover.img}')`;bg.style.opacity='1';col.style.background='rgba(0,0,0,0.45)';}
  else{const g=cfGrad(m.nome);bg.style.backgroundImage='';bg.style.opacity='0';col.style.background=`linear-gradient(160deg,${g[0]} 0%,${g[1]}55 100%)`;}
}
function cfAtualizarInfo() {
  if(!cfLista.length)return;
  const m=cfLista[cfIdx];
  document.getElementById('cf-song-name').textContent=m.nome;
  document.getElementById('cf-song-artist').textContent=m.artista||'—';
}
function cfRenderDots() {
  const el=document.getElementById('cf-dots'), total=cfLista.length;
  el.innerHTML='';
  if(total<=1)return;
  const max=12, show=Math.min(total,max);
  let s=Math.max(0,cfIdx-Math.floor(show/2)), e=s+show;
  if(e>total){e=total;s=Math.max(0,e-show);}
  for(let i=s;i<e;i++){const d=document.createElement('div');d.className='cf-dot'+(i===cfIdx?' active':'');d.addEventListener('click',()=>{cfIdx=i;cfRender();cfTocarPreview();});el.appendChild(d);}
}
async function cfPreload() {
  if(!cfLista.length)return;
  const total=cfLista.length, prio=[0,1,-1].map(o=>(cfIdx+o+total)%total);
  await Promise.all(prio.map(async i=>{const m=cfLista[i];if(cfCovers[m.nome+'|'+m.artista]===undefined)await cfBuscarCapa(m);}));
  cfAtualizarBg(); cfRender();
  const resto=cfLista.map((_,i)=>i).filter(i=>!prio.includes(i)&&cfCovers[cfLista[i].nome+'|'+cfLista[i].artista]===undefined);
  for(let i=0;i<resto.length;i+=6)await Promise.all(resto.slice(i,i+6).map(idx=>cfBuscarCapa(cfLista[idx])));
}

async function cfAbrirSheet(m) {
  const sheet=document.getElementById('cf-sheet'), grad=cfGrad(m.nome), thumb=document.getElementById('cf-sheet-thumb');
  let cover=cfCovers[m.nome+'|'+m.artista];
  if(!cover)cover=await cfBuscarCapa(m);
  if(cover?.img){thumb.style.backgroundImage=`url('${cover.img}')`;thumb.style.background='';}
  else{thumb.style.backgroundImage='';thumb.style.background=`linear-gradient(135deg,${grad[0]},${grad[1]})`;}
  document.getElementById('cf-sheet-name').textContent=m.nome;
  document.getElementById('cf-sheet-artist').textContent=m.artista||'—';
  const hist=cultos.filter(c=>c.musicas.some(cm=>cm.nome.toLowerCase()===m.nome.toLowerCase()));
  const toms={};
  hist.forEach(c=>{const mu=c.musicas.find(cm=>cm.nome.toLowerCase()===m.nome.toLowerCase());const t=mu.tom||'';if(t)toms[t]=(toms[t]||0)+1;});
  const tomFreq=Object.entries(toms).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  const idxU=cultos.findIndex(c=>c.musicas.some(cm=>cm.nome.toLowerCase()===m.nome.toLowerCase()));
  const ultStr=idxU===0?'último':idxU>0?`${idxU} culto${idxU!==1?'s':''} atrás`:'—';
  document.getElementById('cf-sheet-stats').innerHTML=`<div class="sheet-stat"><div class="sheet-stat-val">${m.usos}</div><div class="sheet-stat-lbl">cultos</div></div><div class="sheet-stat"><div class="sheet-stat-val">${tomFreq}</div><div class="sheet-stat-lbl">tom freq.</div></div><div class="sheet-stat"><div class="sheet-stat-val" style="font-size:13px;line-height:1.3;">${ultStr}</div><div class="sheet-stat-lbl">última vez</div></div>`;
  document.getElementById('cf-sheet-hist').innerHTML=hist.length?hist.map(c=>{const mu=c.musicas.find(cm=>cm.nome.toLowerCase()===m.nome.toLowerCase());return`<div class="sheet-hist-item"><span class="shi-date">${esc(c.data)}</span><span class="shi-leader">${esc(c.ministra||'—')}</span><span class="shi-tom">${esc(mu.tom||'—')}</span></div>`;}).join(''):'<div style="padding:16px 0;color:rgba(255,255,255,0.35);font-size:13px;">Nunca tocada</div>';
  const act=document.getElementById('cf-sheet-actions'); act.innerHTML='';
  const audioUrl=resolveAudioUrl(m.midia);
  if(audioUrl){
    const btn=document.createElement('button');btn.className='sheet-btn';btn.innerHTML='&#9654; Tocar';
    btn.addEventListener('click',()=>{gPlayer.play(audioUrl,m.nome,m.artista||'');cfFecharSheet();});
    act.appendChild(btn);
  }
  sheet.classList.add('open'); document.body.style.overflow='hidden';
}
function cfFecharSheet(){document.getElementById('cf-sheet').classList.remove('open');document.body.style.overflow='';}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('cf-sheet-backdrop').addEventListener('click',cfFecharSheet);
  let dragY=null;
  document.getElementById('cf-sheet-drag').addEventListener('touchstart',e=>{dragY=e.touches[0].clientY;},{passive:true});
  document.getElementById('cf-sheet-drag').addEventListener('touchend',e=>{if(dragY===null)return;if(e.changedTouches[0].clientY-dragY>60)cfFecharSheet();dragY=null;},{passive:true});
  document.getElementById('cfps-bar-wrap').addEventListener('click',e=>{const r=e.currentTarget.getBoundingClientRect();gPlayer.seekTo((e.clientX-r.left)/r.width);});
  document.getElementById('cpb-bar-wrap').addEventListener('click',e=>{const r=e.currentTarget.getBoundingClientRect();gPlayer.seekTo((e.clientX-r.left)/r.width);});
  const panel=document.getElementById('panel-repertorio');
  let tx=0,ty=0,tt=0;
  panel.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;tt=Date.now();},{passive:true});
  panel.addEventListener('touchend',e=>{
    if(document.getElementById('cf-sheet').classList.contains('open'))return;
    const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
    if(Date.now()-tt>400)return;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>44)cfNavegar(dx<0?1:-1);
  },{passive:true});
  let mx=null;
  panel.addEventListener('mousedown',e=>{mx=e.clientX;});
  panel.addEventListener('mouseup',e=>{if(mx===null||document.getElementById('cf-sheet').classList.contains('open'))return;const dx=e.clientX-mx;if(Math.abs(dx)>44)cfNavegar(dx<0?1:-1);mx=null;});
});

// ══ CULTOS ══
let cMonths=[],cMIdx=0,cCIdx=0,cSIdx=0;
const C_PALETTES=[['#0d1228','#1a2a5e'],['#1a0d28','#3a1a5e'],['#0a1e16','#1a3d2c'],['#0d1a0a','#1f3d10'],['#1a1300','#3a2c00'],['#1a0c00','#3d2000'],['#1a0012','#3a0028'],['#001a1a','#003838'],['#141200','#2e2900'],['#1a0707','#3a1212'],['#0a0c1a','#1a1e3c'],['#00101e','#001e40']];
const C_MESES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const C_MESES_S=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const C_DIAS=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

function renderCultos(){cMonths=cBuildMonths(cultos);cRenderStats();}
function cBuildMonths(c){const map={};c.forEach(cu=>{const d=parseDataBR(cu.data),k=`${d.getFullYear()}_${d.getMonth()}`;if(!map[k])map[k]={year:d.getFullYear(),month:d.getMonth(),cultos:[]};map[k].cultos.push(cu);});return Object.values(map).sort((a,b)=>b.year-a.year||b.month-a.month);}
function cRenderStats(){
  document.getElementById('c-sv-tot').textContent=cultos.length;
  const ss=new Set(cultos.flatMap(c=>c.musicas.map(m=>m.nome.toLowerCase())));
  document.getElementById('c-sv-uniq').textContent=ss.size;
  const ls=new Set(cultos.map(c=>(c.ministra||'').toLowerCase()).filter(Boolean));
  document.getElementById('c-sv-lead').textContent=ls.size||'—';
  const now=new Date(),top=cGetTopMes(now.getMonth(),now.getFullYear());
  document.getElementById('c-sv-top').textContent=top.length?(top[0].nome.length>13?top[0].nome.slice(0,12)+'...':top[0].nome):'—';
}
function cGetTopMes(mes,ano){const freq={};cultos.forEach(c=>{const d=parseDataBR(c.data);if(d.getMonth()!==mes||d.getFullYear()!==ano)return;c.musicas.forEach(m=>{const k=m.nome.toLowerCase();freq[k]=(freq[k]||0)+1;});});return Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(([k,cnt])=>({nome:cultos.flatMap(c=>c.musicas).find(m=>m.nome.toLowerCase()===k)?.nome||k,cnt}));}
function cInitView(){if(!cMonths.length)return;const now=new Date(),idx=cMonths.findIndex(m=>m.month===now.getMonth()&&m.year===now.getFullYear());cMIdx=idx>=0?idx:0;cCIdx=0;cSIdx=0;cRenderMonths();cRenderAll();}
function cRenderMonths(){
  const el=document.getElementById('c-months');
  el.innerHTML=cMonths.map((m,i)=>`<button class="c-mpill${i===cMIdx?' active':''}" onclick="cSelectMonth(${i})">${C_MESES_S[m.month]} ${m.year}</button>`).join('');
  const pill=el.children[cMIdx];if(pill)el.scrollLeft=pill.offsetLeft-el.offsetWidth/2+pill.offsetWidth/2;
}
function cUpdateBg(){if(!cMonths.length)return;const [c1,c2]=C_PALETTES[cMonths[cMIdx].month];document.getElementById('c-bg').style.background=`linear-gradient(160deg,${c1} 0%,#0d0d0d 100%)`;document.getElementById('c-bg-blur').style.background=`radial-gradient(ellipse at 30% 30%,${c2}88 0%,transparent 70%)`;}
function cRenderAll(){cUpdateBg();cRenderCarousel();cRenderInfo();cRenderSongList();}
function cRenderCarousel(){
  const cs=cMonths[cMIdx]?.cultos||[],total=cs.length,cont=document.getElementById('c-cards');
  cont.innerHTML='';
  [-2,-1,0,1,2].forEach(off=>{
    if(!total)return;
    const idx=(cCIdx+off+total)%total,c=cs[idx],d=parseDataBR(c.data);
    const pos=off===0?'pos-c':off===-1?'pos-l':off===1?'pos-r':off<-1?'pos-hl':'pos-hr';
    const div=document.createElement('div');div.className=`cc ${pos}`;
    div.innerHTML=`<div class="cc-tint"></div><div class="cc-body"><div class="cc-top"><div class="cc-day">${d.getDate()}</div><div class="cc-meta"><div class="cc-dow">${C_DIAS[d.getDay()]}</div><div class="cc-myr">${C_MESES_S[d.getMonth()]} ${d.getFullYear()}</div></div></div><div><div class="cc-leader">${esc(c.ministra||'—')}</div><div class="cc-count">${c.musicas.length} músicas</div></div></div>`;
    if(off!==0)div.addEventListener('click',()=>cNavCulto(off<0?-1:1));
    cont.appendChild(div);
  });
}
function cRenderInfo(){
  const cs=cMonths[cMIdx]?.cultos||[],total=cs.length;
  document.getElementById('c-pos').textContent=total>1?`culto ${cCIdx+1} de ${total}`:'';
  const el=document.getElementById('c-dots');el.innerHTML='';
  if(total<=1)return;
  const show=Math.min(total,10);let s=Math.max(0,cCIdx-Math.floor(show/2)),e=Math.min(total,s+show);
  if(e-s<show)s=Math.max(0,e-show);
  for(let i=s;i<e;i++){const d=document.createElement('div');d.className=`c-dot${i===cCIdx?' active':''}`;d.addEventListener('click',()=>cSelectCulto(i));el.appendChild(d);}
}
function cRenderSongList(){
  const cs=cMonths[cMIdx]?.cultos||[],songs=cs[cCIdx]?.musicas||[];
  const el=document.getElementById('c-song-list');el.innerHTML='';
  songs.forEach((m,i)=>{
    const info=musicas.find(x=>x.nome.toLowerCase()===m.nome.toLowerCase());
    const item=document.createElement('div');
    item.className='csl-item'+(i===cSIdx?' active':'');
    item.innerHTML=`<div class="csl-compact"><span class="csl-num">${i+1}</span><span class="csl-name">${esc(m.nome)}</span>${m.tom?`<span class="csl-tom-badge">${esc(m.tom)}</span>`:''}</div><div class="csl-expanded">${info?.artista?`<div class="csl-artist">${esc(info.artista)}</div>`:''}</div>`;
    item.addEventListener('click',()=>cSelectSong(i,m,info));
    el.appendChild(item);
  });
  if(gPlayer.audio&&gPlayer.url)document.getElementById('c-player-bar').classList.add('vis');
}
function cSelectSong(idx,m,info){
  cSIdx=idx;cRenderSongList();
  const url=resolveAudioUrl(m?.mp3);if(!url)return;
  gPlayer.play(url,m.nome,info?.artista||'');
  document.getElementById('cpb-name').textContent=m.nome;
  document.getElementById('cpb-artist').textContent=info?.artista||'';
  document.getElementById('c-player-bar').classList.add('vis');
}
function cSelectMonth(idx){if(idx===cMIdx)return;cMIdx=idx;cCIdx=0;cSIdx=0;document.querySelectorAll('.c-mpill').forEach((p,i)=>p.classList.toggle('active',i===idx));const strip=document.getElementById('c-months'),pill=strip.children[idx];if(pill)strip.scrollLeft=pill.offsetLeft-strip.offsetWidth/2+pill.offsetWidth/2;cRenderAll();}
function cNavCulto(dir){const cs=cMonths[cMIdx]?.cultos||[],n=cCIdx+dir;if(n<0||n>=cs.length)return;cCIdx=n;cSIdx=0;cRenderCarousel();cRenderInfo();cRenderSongList();}
function cSelectCulto(idx){if(idx===cCIdx)return;cCIdx=idx;cSIdx=0;cRenderCarousel();cRenderInfo();cRenderSongList();}

let cTx=0,cTy=0,cTZ=null;
document.addEventListener('touchstart',e=>{if(!document.getElementById('panel-cultos').classList.contains('active'))return;cTx=e.touches[0].clientX;cTy=e.touches[0].clientY;cTZ=e.target.closest('#c-stage,#c-info')?'culto':null;},{passive:true});
document.addEventListener('touchend',e=>{if(!cTZ)return;const dx=e.changedTouches[0].clientX-cTx,dy=e.changedTouches[0].clientY-cTy;if(Math.abs(dx)<Math.abs(dy)||Math.abs(dx)<38){cTZ=null;return;}cNavCulto(dx<0?1:-1);cTZ=null;},{passive:true});

function cToggleSheet(){const open=document.getElementById('c-sh').classList.contains('open');open?cFecharSheet():cAbrirSheet();}
function cAbrirSheet(){document.getElementById('c-sh').classList.add('open');document.getElementById('c-sh-ov').classList.add('open');document.getElementById('c-fab').classList.add('open');cRenderPendente();}
function cFecharSheet(){document.getElementById('c-sh').classList.remove('open');document.getElementById('c-sh-ov').classList.remove('open');document.getElementById('c-fab').classList.remove('open');}
function cRenderPendente(){const el=document.getElementById('c-pend-list');document.getElementById('c-pend-ct').textContent=cultoPendente.length?`(${cultoPendente.length})`:'';if(!cultoPendente.length){el.innerHTML='<div style="color:rgba(255,255,255,.22);font-size:12px;padding:4px 0;">Nenhuma música adicionada.</div>';return;}el.innerHTML=cultoPendente.map((m,i)=>`<div class="c-pend-item"><span class="c-pend-num">${i+1}.</span><span class="c-pend-name">${esc(m.nome)}</span><input class="c-pend-tom" placeholder="Tom" value="${esc(m.tom)}" oninput="cultoPendente[${i}].tom=this.value"><button class="c-pend-rm" onclick="cultoPendente.splice(${i},1);cRenderPendente()">×</button></div>`).join('');}
function cAbrirTopMes(){const now=new Date(),top=cGetTopMes(now.getMonth(),now.getFullYear());document.getElementById('c-tm-title').textContent=C_MESES[now.getMonth()];document.getElementById('c-tm-sub').textContent=top.length?`${top.length} músicas tocadas`:'Nenhum culto este mês.';document.getElementById('c-tm-rows').innerHTML=top.slice(0,5).map((t,i)=>`<div class="c-tm-row"><span class="c-tm-rank">${i+1}</span><span class="c-tm-name">${esc(t.nome)}</span><span class="c-tm-cnt">${t.cnt}×</span></div>`).join('');document.getElementById('c-tm-ov').classList.add('open');}
function cFecharTopMes(){document.getElementById('c-tm-ov').classList.remove('open');}
function selecionarMusica(nome){const m=musicas.find(x=>x.nome===nome);if(!m)return;if(!cultoPendente.find(x=>x.nome===nome)){cultoPendente.push({nome:m.nome,tom:''});cRenderPendente();}fecharPicker();}
async function salvarCulto(){const data=document.getElementById('c-data').value.trim(),ministra=document.getElementById('c-ministra').value.trim();if(!data){toast('Data é obrigatória.',true);return;}if(!cultoPendente.length){toast('Adicione pelo menos uma música.',true);return;}const btn=document.getElementById('c-btn-save');btn.disabled=true;btn.textContent='Salvando...';const ok=await chamarScript({acao:'adicionarCulto',data,ministra,musicas:cultoPendente});btn.disabled=false;btn.textContent='Salvar culto na planilha';if(ok){toast('Culto salvo!');document.getElementById('c-data').value='';document.getElementById('c-ministra').value='';cultoPendente=[];cFecharSheet();setTimeout(()=>location.reload(),1500);}}
async function chamarScript(payload){try{const r=await fetch(SCRIPT_URL,{method:'POST',body:JSON.stringify(payload)});const j=await r.json();if(j.status==='ok')return true;toast('Erro: '+j.msg,true);return false;}catch(e){toast('Erro de conexão.',true);return false;}}

// ══ TABS ══
function showTab(id,btn){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.cf-nav-pill,.other-nav-pill').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  const isCultos=id==='cultos';
  ['c-stats','c-months','c-stage','c-info','c-song-stage'].forEach(eid=>document.getElementById(eid).classList.toggle('vis',isCultos));
  document.getElementById('c-fab').classList.toggle('vis',isCultos);
  if(id==='repertorio') document.getElementById('other-nav').classList.remove('visible');
  else {
    document.getElementById('other-nav').classList.add('visible');
    document.querySelectorAll('.other-nav-pill').forEach(p=>{if(p.textContent.toLowerCase().includes(id==='cultos'?'culto':'ensaio'))p.classList.add('active');});
    if(id==='ensaio')renderEnsaioTab();
    if(id==='cultos')cInitView();
  }
}

// ══ ENSAIO ══
const HOLYRICS_URL='http://10.10.10.44:8060/view/standard';
const LOADING_MSGS=['Afinando as cordas...','Buscando cifras no Drive...','Preparando o setlist...','Quase lá...','Chegando já...'];
let ensaioMusicas=[],ensaioIdx=0,ensaioWakeLock=null,loadingInterval=null,touchStartX=0,touchStartY=0,ensaioPerfil=null;

function renderEnsaioTab(){document.getElementById('ensaio-instrumentista-area').style.display='none';document.querySelectorAll('.ensaio-choice-card').forEach(c=>c.classList.remove('selected'));ensaioPerfil=null;}
function selecionarPerfil(p){ensaioPerfil=p;document.querySelectorAll('.ensaio-choice-card').forEach(c=>c.classList.remove('selected'));document.getElementById('choice-'+p).classList.add('selected');if(p==='vocalista'){abrirHolyrics();return;}document.getElementById('ensaio-instrumentista-area').style.display='block';renderSongList();}
function renderSongList(){const infoEl=document.getElementById('ensaio-culto-info'),listEl=document.getElementById('ensaio-song-list');if(!cultos.length){infoEl.textContent='';listEl.innerHTML='<div class="ensaio-no-culto">Nenhum culto registrado ainda.</div>';return;}const c=cultos[0];infoEl.innerHTML=`<strong>${esc(c.data)}</strong> &middot; ${c.musicas.length} música${c.musicas.length!==1?'s':''} &middot; ${esc(c.ministra)||'—'}`;ensaioMusicas=c.musicas.map(m=>{const info=musicas.find(x=>x.nome.toLowerCase()===m.nome.toLowerCase());const cStr=info?.cifra||'';return{nome:m.nome,artista:info?.artista||'',tom:m.tom||'',driveId:extrairDriveId(cStr),linksExternos:extrairLinksExternos(cStr)};});listEl.innerHTML=ensaioMusicas.map((m,i)=>`<button class="ensaio-song-btn" onclick="abrirCifra(${i})"><div class="ensaio-song-num">${i+1}.</div><div class="ensaio-song-info"><div class="ensaio-song-name">${esc(m.nome)}</div>${m.artista?`<div class="ensaio-song-artist">${esc(m.artista)}</div>`:''}</div>${m.tom?`<div class="ensaio-song-tom">${esc(m.tom)}</div>`:''}<div class="ensaio-song-arrow">›</div></button>`).join('');}
function abrirCifra(idx){ensaioIdx=idx;mostrarLoading();setTimeout(()=>{esconderLoading();abrirEnsaioFs();},1200);}
function abrirHolyrics(){document.getElementById('holyrics-iframe').src=HOLYRICS_URL;document.getElementById('holyrics-fs').style.display='block';document.body.style.overflow='hidden';}
function fecharHolyrics(){document.getElementById('holyrics-fs').style.display='none';document.getElementById('holyrics-iframe').src='';document.body.style.overflow='';document.querySelectorAll('.ensaio-choice-card').forEach(c=>c.classList.remove('selected'));ensaioPerfil=null;}
function extrairDriveId(s){if(!s)return null;const urls=s.match(/https?:\/\/[^\s]+/g)||[];for(const u of urls){const m=u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);if(m)return m[1];}return null;}
function extrairLinksExternos(s){if(!s)return[];return(s.match(/https?:\/\/[^\s]+/g)||[]).filter(u=>!u.includes('drive.google.com/file'));}
function mostrarLoading(){const el=document.getElementById('ensaio-loading-msg');let i=0;el.textContent=LOADING_MSGS[0];el.style.opacity='1';loadingInterval=setInterval(()=>{el.style.opacity='0';setTimeout(()=>{i=(i+1)%LOADING_MSGS.length;el.textContent=LOADING_MSGS[i];el.style.opacity='1';},250);},900);document.getElementById('ensaio-loading').classList.add('open');}
function esconderLoading(){clearInterval(loadingInterval);document.getElementById('ensaio-loading').classList.remove('open');}
async function abrirEnsaioFs(){document.getElementById('ensaio-fs').classList.add('open');document.getElementById('ensaio-bar').classList.add('open');document.body.style.overflow='hidden';renderEnsaioSlide();try{if('wakeLock'in navigator)ensaioWakeLock=await navigator.wakeLock.request('screen');}catch(e){}document.getElementById('ensaio-fs').addEventListener('touchstart',onEnsaioTS,{passive:true});document.getElementById('ensaio-fs').addEventListener('touchend',onEnsaioTE,{passive:true});}
function fecharEnsaio(){document.getElementById('ensaio-fs').classList.remove('open');document.getElementById('ensaio-bar').classList.remove('open');document.getElementById('ensaio-iframe').src='';document.getElementById('ensaio-no-cifra-msg').style.display='none';document.body.style.overflow='';fecharMenuEnsaio();if(ensaioWakeLock){ensaioWakeLock.release().catch(()=>{});ensaioWakeLock=null;}document.getElementById('ensaio-fs').removeEventListener('touchstart',onEnsaioTS);document.getElementById('ensaio-fs').removeEventListener('touchend',onEnsaioTE);}
function renderEnsaioSlide(){const m=ensaioMusicas[ensaioIdx],total=ensaioMusicas.length,iframe=document.getElementById('ensaio-iframe'),noMsg=document.getElementById('ensaio-no-cifra-msg');document.getElementById('ensaio-bar-nome').textContent=m.nome.length>28?m.nome.slice(0,26)+'...':m.nome;document.getElementById('ensaio-prev').disabled=ensaioIdx===0;document.getElementById('ensaio-next').disabled=ensaioIdx===total-1;if(m.driveId){iframe.src='https://drive.google.com/file/d/'+m.driveId+'/preview?rm=minimal';iframe.style.display='block';noMsg.style.display='none';}else{iframe.src='';iframe.style.display='none';let html='<div class="icon">🎵</div><div>'+esc(m.nome)+'</div>';if(m.linksExternos.length)html+=m.linksExternos.map(u=>'<a href="'+esc(u)+'" class="ensaio-ext-link" target="_blank" rel="noopener">↗ Abrir cifra externa</a>').join('');else html+='<div style="font-size:13px;opacity:0.6;">Sem cifra cadastrada.</div>';noMsg.innerHTML=html;noMsg.style.display='flex';}}
function navegarEnsaio(dir){const n=ensaioIdx+dir;if(n<0||n>=ensaioMusicas.length)return;ensaioIdx=n;renderEnsaioSlide();}
function onEnsaioTS(e){touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY;}
function onEnsaioTE(e){if(e.touches.length>0)return;const dx=e.changedTouches[0].clientX-touchStartX,dy=e.changedTouches[0].clientY-touchStartY;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>55)navegarEnsaio(dx<0?1:-1);}
function abrirMenuEnsaio(){document.getElementById('ensaio-menu-list').innerHTML=ensaioMusicas.map((m,i)=>`<div class="ensaio-menu-item${i===ensaioIdx?' active':''}" onclick="irParaMusica(${i})"><div class="ensaio-menu-num">${i+1}</div><div class="ensaio-menu-info"><div class="ensaio-menu-nome">${esc(m.nome)}</div><div class="ensaio-menu-meta">${m.artista||''}${m.tom?' · Tom '+esc(m.tom):''}</div></div>${i===ensaioIdx?'<div class="ensaio-menu-playing">▶</div>':''}</div>`).join('');document.getElementById('ensaio-menu').classList.add('open');}
function fecharMenuEnsaio(){document.getElementById('ensaio-menu').classList.remove('open');}
function irParaMusica(idx){ensaioIdx=idx;fecharMenuEnsaio();renderEnsaioSlide();}
function fecharErroEnsaio(){document.getElementById('ensaio-error').classList.remove('open');}
function abrirPicker(){document.getElementById('picker-overlay').classList.add('open');document.getElementById('picker-search').value='';renderPicker();}
function fecharPicker(){document.getElementById('picker-overlay').classList.remove('open');}
function fecharPickerSeFora(e){if(e.target===document.getElementById('picker-overlay'))fecharPicker();}
function renderPicker(){const q=document.getElementById('picker-search').value.toLowerCase(),el=document.getElementById('picker-list');el.innerHTML=musicas.filter(m=>m.nome.toLowerCase().includes(q)||m.artista.toLowerCase().includes(q)).slice(0,50).map(m=>`<div class="picker-item" onclick="selecionarMusica('${esc(m.nome)}')"><div><div class="picker-item-name">${esc(m.nome)}</div><div class="picker-item-artist">${esc(m.artista)}</div></div><span class="picker-item-badge">${m.usos}×</span></div>`).join('');}

document.addEventListener('keydown',e=>{
  if(document.getElementById('ensaio-fs').classList.contains('open')){
    if(e.key==='ArrowRight'||e.key==='ArrowDown')navegarEnsaio(1);
    if(e.key==='ArrowLeft'||e.key==='ArrowUp')navegarEnsaio(-1);
    if(e.key==='Escape')fecharEnsaio();
    return;
  }
  if(document.getElementById('panel-repertorio').classList.contains('active')&&cfLista.length){
    if(e.key==='ArrowRight')cfNavegar(1);
    if(e.key==='ArrowLeft')cfNavegar(-1);
  }
});

function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function toast(msg,erro=false){const t=document.getElementById('toast');t.textContent=msg;t.className='toast show'+(erro?' erro':'');setTimeout(()=>t.className='toast',3000);}

carregarDados();
</script>
</body>
</html>
