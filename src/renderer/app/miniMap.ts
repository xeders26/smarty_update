/*================
  src/renderer/app/miniMap.ts
=================*/
import * as Blockly from 'blockly';

export function initMinimap(workspace: Blockly.WorkspaceSvg) {
  // 🚨 화면 전체를 감시하여 버튼이 나중에 생겨도 무조건 작동하게 만듦!
  const switchTab = (tabName: 'map' | 'serial') => {
    const mapTabBtn = document.getElementById('mapTabBtn');
    const serialTabBtn = document.getElementById('serialTabBtn');
    const minimapArea = document.getElementById('minimapArea');
    const serialMonitorContent = document.getElementById('serialMonitorContent');

    if (mapTabBtn) mapTabBtn.classList.remove('active-tab');
    if (serialTabBtn) serialTabBtn.classList.remove('active-tab');
    if (minimapArea) minimapArea.style.display = 'none';
    if (serialMonitorContent) serialMonitorContent.style.display = 'none';

    if (tabName === 'map') {
      if (mapTabBtn) mapTabBtn.classList.add('active-tab');
      if (minimapArea) minimapArea.style.display = 'block';
      drawMinimap();
    } else if (tabName === 'serial') {
      if (serialTabBtn) serialTabBtn.classList.add('active-tab');
      if (serialMonitorContent) serialMonitorContent.style.display = 'flex';
    }
  };

  // 👑 모든 클릭을 가로채서 명령 수행
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('#mapTabBtn')) switchTab('map');
    else if (target.closest('#serialTabBtn')) switchTab('serial');
    else if (target.closest('#themeToggleBtn')) {
      // 다크모드 전환 시 미니맵 도화지 배경색 즉시 갱신
      setTimeout(drawMinimap, 100); 
    }
  });

  let isDrawing = false;
  workspace.addChangeListener((e: any) => {
    if (!e.isUiEvent || e.type === Blockly.Events.VIEWPORT_CHANGE) {
      if (!isDrawing) {
        isDrawing = true;
        requestAnimationFrame(() => {
          drawMinimap();
          isDrawing = false;
        });
      }
    }
  });

  let ctx: CanvasRenderingContext2D | null = null;
  let scale = 1, offsetX = 0, offsetY = 0;
  let globalScrollMetrics: any = null;

  const drawMinimap = () => {
    try {
      const minimapArea = document.getElementById('minimapArea');
      const canvas = document.getElementById('minimapCanvas') as HTMLCanvasElement;
      
      if (!minimapArea || minimapArea.style.display === 'none' || !canvas) return;
      if (!ctx) ctx = canvas.getContext('2d');
      if (!ctx) return;

      const newW = minimapArea.clientWidth;
      const newH = minimapArea.clientHeight;
      if (newW <= 0 || newH <= 0) return;

      if (canvas.width !== newW) canvas.width = newW;
      if (canvas.height !== newH) canvas.height = newH;

      ctx.clearRect(0, 0, newW, newH);

      const metricsManager = workspace.getMetricsManager();
      const scrollMetrics = metricsManager.getScrollMetrics(true);
      const viewMetrics = metricsManager.getViewMetrics(true);
      
      globalScrollMetrics = scrollMetrics;
      if (!scrollMetrics || scrollMetrics.width === 0 || scrollMetrics.height === 0) return;

      const pad = 20;
      const usableW = newW - pad * 2;
      const usableH = newH - pad * 2;
      if (usableW <= 0 || usableH <= 0) return;

      const scaleX = usableW / scrollMetrics.width;
      const scaleY = usableH / scrollMetrics.height;
      scale = Math.min(scaleX, scaleY); 

      const scaledMapWidth = scrollMetrics.width * scale;
      const scaledMapHeight = scrollMetrics.height * scale;

      offsetX = pad + (usableW - scaledMapWidth) / 2;
      offsetY = pad + (usableH - scaledMapHeight) / 2;

      const isDark = document.body.classList.contains('dark-mode');
      
      ctx.fillStyle = isDark ? '#2c3e50' : '#ffffff';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(offsetX, offsetY, scaledMapWidth, scaledMapHeight, 8);
      } else {
        ctx.rect(offsetX, offsetY, scaledMapWidth, scaledMapHeight);
      }
      ctx.fill();

      ctx.strokeStyle = isDark ? '#1a252f' : '#bdc3c7';
      ctx.lineWidth = 1;
      ctx.stroke();

      const blocks = workspace.getAllBlocks(false);
      blocks.forEach(block => {
        const rect = block.getBoundingRectangle();
        const bw = (rect.right - rect.left) * scale;
        const bh = (rect.bottom - rect.top) * scale;
        const bx = offsetX + (rect.left - scrollMetrics.left) * scale;
        const by = offsetY + (rect.top - scrollMetrics.top) * scale;
        if (!ctx) return;
        ctx.fillStyle = block.getColour();
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(bx, by, bw, bh, 3);
        } else {
          ctx.rect(bx, by, bw, bh);
        }
        ctx.fill();
      });

      const vx = offsetX + (viewMetrics.left - scrollMetrics.left) * scale;
      const vy = offsetY + (viewMetrics.top - scrollMetrics.top) * scale;
      const vw = viewMetrics.width * scale;
      const vh = viewMetrics.height * scale;

      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(52, 152, 219, 0.15)';
      ctx.strokeStyle = isDark ? '#ffffff' : '#3498db';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(vx, vy, vw, vh, 4);
      } else {
        ctx.rect(vx, vy, vw, vh);
      }
      ctx.fill();
      ctx.stroke();
    } catch (err) {}
  };

  if (typeof ResizeObserver !== 'undefined') {
    let resizeFrameId: number;
    let lastMapW = 0, lastMapH = 0;
    const minimapArea = document.getElementById('minimapArea');
    if (minimapArea) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (minimapArea.style.display !== 'none') {
          const { width, height } = entries[0].contentRect;
          if (Math.abs(width - lastMapW) < 1 && Math.abs(height - lastMapH) < 1) return;
          lastMapW = width;
          lastMapH = height;
          cancelAnimationFrame(resizeFrameId);
          resizeFrameId = requestAnimationFrame(() => drawMinimap());
        }
      });
      resizeObserver.observe(minimapArea);
    }
  }

  window.addEventListener('resize', () => requestAnimationFrame(drawMinimap));


  // ==========================================
  // 🌟[핵심 마법] 미니맵 클릭 및 '드래그(Drag)' 지원 로직
  // ==========================================
  let animationFrameId: number;
  let isDraggingMinimap = false; // 마우스 클릭 상태 추적기

  // 도화지 특정 위치를 계산하고 이동시키는 통합 함수
  const moveWorkspaceToMinimapPos = (e: MouseEvent, animate: boolean) => {
    try {
      const canvas = document.getElementById('minimapCanvas') as HTMLCanvasElement;
      if (!canvas || !globalScrollMetrics) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const targetWorkspaceX = (clickX - offsetX) / scale + globalScrollMetrics.left;
      const targetWorkspaceY = (clickY - offsetY) / scale + globalScrollMetrics.top;

      const metricsManager = workspace.getMetricsManager();
      const viewMetrics = metricsManager.getViewMetrics(true);
      
      const currentCenterX = viewMetrics.left + viewMetrics.width / 2;
      const currentCenterY = viewMetrics.top + viewMetrics.height / 2;

      const deltaX = targetWorkspaceX - currentCenterX;
      const deltaY = targetWorkspaceY - currentCenterY;

      const deltaPixelsX = deltaX * workspace.scale;
      const deltaPixelsY = deltaY * workspace.scale;

      const targetScrollX = workspace.scrollX - deltaPixelsX;
      const targetScrollY = workspace.scrollY - deltaPixelsY;

      if (isNaN(targetScrollX) || isNaN(targetScrollY)) return;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // 드래그 중일 때는 딜레이 없이 즉시 이동(실시간 반응), 클릭일 때는 부드럽게 이동
      if (animate) {
        const startScrollX = workspace.scrollX;
        const startScrollY = workspace.scrollY;
        const duration = 400;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
          let elapsed = currentTime - startTime;
          if (elapsed > duration) elapsed = duration;

          const t = elapsed / duration;
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          workspace.scroll(
            startScrollX + (targetScrollX - startScrollX) * ease,
            startScrollY + (targetScrollY - startScrollY) * ease
          );

          if (elapsed < duration) {
            animationFrameId = requestAnimationFrame(animateScroll);
          }
        };
        animationFrameId = requestAnimationFrame(animateScroll);
      } else {
        workspace.scroll(targetScrollX, targetScrollY);
      }
    } catch (err) {}
  };

  // 1. 마우스를 눌렀을 때 (최초 클릭 시 애니메이션으로 이동 시작)
  document.addEventListener('mousedown', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('#minimapCanvas')) {
      isDraggingMinimap = true;
      moveWorkspaceToMinimapPos(e, true); // 최초 클릭은 부드럽게 이동
    }
  });

  // 2. 마우스를 누른 채로 움직일 때 (드래그 시 즉시 화면 동기화)
  document.addEventListener('mousemove', (e) => {
    if (isDraggingMinimap) {
      moveWorkspaceToMinimapPos(e, false); // 드래그는 즉시 이동!
    }
  });

  // 3. 마우스 클릭을 떼었을 때 (드래그 종료)
  document.addEventListener('mouseup', () => {
    isDraggingMinimap = false;
  });

  // 초기화 렌더링 호출
  setTimeout(drawMinimap, 100);
  setTimeout(drawMinimap, 600);
}