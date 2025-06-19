// BSS/OSS Tabbed Section with auto-rotation, shimmer, and pill enlargement
(function() {
  const tabs = [
    {
      key: 'billing',
      label: 'BILLING',
      icon: '💰',
      color: '#ffd6db',
      title: 'Real-Time Convergent Billing',
      desc: 'Instantaneous, accurate billing across all services and products. Ensures transparency and customer trust.',
      img: 'stats.png'
    },
    {
      key: 'charging',
      label: 'CHARGING',
      icon: '🧾',
      color: '#ffe9b3',
      title: 'Online Charging System',
      desc: 'AI-powered insights that predict customer needs and drive personalized experiences.',
      img: 'graph.png'
    },
    {
      key: 'catalog',
      label: 'CATALOG',
      icon: '📦',
      color: '#eaffc7',
      title: 'Product Catalog',
      desc: 'Centralized management of all products and services, enabling rapid go-to-market.',
      img: 'cards.png'
    },
    {
      key: 'events',
      label: 'EVENTS',
      icon: '📅',
      color: '#b3f0ff',
      title: 'Event Management',
      desc: 'Track, analyze, and respond to events in real time for operational excellence.',
      img: 'showcase work.mp4'
    }
  ];
  let active = 0;
  let autoTimer = null;
  const tabsContainer = document.querySelector('.bss-oss-tabs');
  const contentContainer = document.querySelector('.bss-oss-tab-content');
  if (!tabsContainer || !contentContainer) return;

  function render(showSkeletonTab = false) {
    // Tabs
    tabsContainer.innerHTML = tabs.map((tab, i) => `
      <div class="bss-oss-tab ${tab.key} ${i === active ? 'active' : ''} ${showSkeletonTab && i === active ? 'skeleton-tab' : ''}" style="--tab-color: ${tab.color}" data-idx="${i}">
        <span class="tab-icon">${tab.icon}</span>
        <span>${tab.label}</span>
      </div>
    `).join('');
    // Content (always show real content)
    const tab = tabs[active];
    contentContainer.innerHTML = `
      <div class="tab-content-left">
        <div class="tab-content-title">${tab.title}</div>
        <div class="tab-content-desc">${tab.desc}</div>
      </div>
      <div class="tab-content-right">
        <div class="tab-content-img">
          ${tab.img.endsWith('.mp4') ?
            `<video src="${tab.img}" controls style="width:100%;height:100%;border-radius:16px;background:#e3e9ed;"></video>` :
            `<img src="${tab.img}" alt="${tab.label}" style="width:100%;height:100%;object-fit:contain;border-radius:16px;" />`
          }
        </div>
      </div>
    `;
    // Tab click events
    Array.from(tabsContainer.children).forEach((el, i) => {
      el.onclick = () => {
        if (i === active) return;
        clearInterval(autoTimer);
        active = i;
        render(true); // show skeleton shimmer on tab
        setTimeout(() => {
          render(false);
          startAutoRotate();
        }, 1000);
      };
    });
  }

  function startAutoRotate() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      let next = (active + 1) % tabs.length;
      render(true);
      setTimeout(() => {
        active = next;
        render(false);
      }, 1000);
    }, 3000);
  }

  render();
  startAutoRotate();
})(); 