// ===== DASHBOARD DATA & CONFIGURATION =====
const dashboardData = {
    yearlyRevenue: [
        { month: 'يناير', revenue: 12500, profit: 8750, customers: 647 },
        { month: 'فبراير', revenue: 18200, profit: 12740, customers: 892 },
        { month: 'مارس', revenue: 25800, profit: 18060, customers: 1247 },
        { month: 'أبريل', revenue: 35400, profit: 24780, customers: 1658 },
        { month: 'مايو', revenue: 42100, profit: 29470, customers: 2089 },
        { month: 'يونيو', revenue: 45800, profit: 32060, customers: 2347 },
        { month: 'يوليو', revenue: 52400, profit: 36680, customers: 2456 },
        { month: 'أغسطس', revenue: 58900, profit: 41230, customers: 2578 },
        { month: 'سبتمبر', revenue: 65200, profit: 45640, customers: 2689 },
        { month: 'أكتوبر', revenue: 72800, profit: 50960, customers: 2734 },
        { month: 'نوفمبر', revenue: 81500, profit: 57050, customers: 2798 },
        { month: 'ديسمبر', revenue: 89240, profit: 62468, customers: 2847 }
    ],
    
    topProducts: [
        { name: 'قهوة عربية مميزة', sales: 2847, revenue: 28470, growth: 45 },
        { name: 'كابتشينو إيطالي', sales: 2156, revenue: 25872, growth: 38 },
        { name: 'لاتيه بالفانيليا', sales: 1893, revenue: 22716, growth: 42 },
        { name: 'تشيز كيك نيويورك', sales: 1456, revenue: 20384, growth: 52 },
        { name: 'سموثي التوت البري', sales: 1278, revenue: 17892, growth: 67 }
    ],
    
    aiInsights: [
        { type: 'توقع الطلب', accuracy: 97, implementations: 124, savings: 8500 },
        { type: 'تحسين المخزون', accuracy: 94, implementations: 89, savings: 6200 },
        { type: 'تحليل العملاء', accuracy: 96, implementations: 156, savings: 7800 },
        { type: 'تحسين الأسعار', accuracy: 92, implementations: 67, savings: 5900 }
    ]
};

// ===== NAVIGATION & SECTION SWITCHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show corresponding section
            const targetSection = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Initialize charts for the active section
                if (targetSection === 'financial') {
                    initFinancialCharts();
                } else if (targetSection === 'customers') {
                    initCustomerCharts();
                } else if (targetSection === 'sales') {
                    initSalesCharts();
                } else if (targetSection === 'ai') {
                    initAICharts();
                }
            }
        });
    });

    // Initialize default charts
    setTimeout(() => {
        initOverviewAnimations();
    }, 500);

    // Time filter functionality
    const timeFilter = document.getElementById('timeFilter');
    if (timeFilter) {
        timeFilter.addEventListener('change', function() {
            updateDataBasedOnTimeFilter(this.value);
        });
    }

    // Export functionality
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDashboard);
    }
});

// ===== OVERVIEW ANIMATIONS =====
function initOverviewAnimations() {
    // Animate metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Count up animations for primary values
    const primaryValues = document.querySelectorAll('.primary-value');
    primaryValues.forEach(value => {
        animateCountUp(value);
    });

    // Animate journey milestones
    const milestones = document.querySelectorAll('.journey-milestone');
    milestones.forEach((milestone, index) => {
        setTimeout(() => {
            milestone.style.opacity = '1';
            milestone.style.transform = 'scale(1)';
        }, index * 300 + 1000);
    });
}

// ===== COUNT UP ANIMATION =====
function animateCountUp(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isDollar = text.includes('$');
    const isComma = text.includes(',');
    
    let finalValue = parseFloat(text.replace(/[$,%]/g, ''));
    let currentValue = 0;
    const increment = finalValue / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }

        let displayValue = Math.floor(currentValue);
        if (isComma && displayValue >= 1000) {
            displayValue = displayValue.toLocaleString();
        }

        if (isDollar) {
            element.textContent = '$' + displayValue;
        } else if (isPercentage) {
            element.textContent = displayValue + '%';
        } else {
            element.textContent = displayValue;
        }
    }, stepTime);
}

// ===== FINANCIAL CHARTS =====
function initFinancialCharts() {
    // Revenue vs Profit Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: dashboardData.yearlyRevenue.map(item => item.month),
                datasets: [{
                    label: 'الإيرادات',
                    data: dashboardData.yearlyRevenue.map(item => item.revenue),
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'الأرباح',
                    data: dashboardData.yearlyRevenue.map(item => item.profit),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// ===== CUSTOMER CHARTS =====
function initCustomerCharts() {
    // Customer Growth Chart
    const customerCtx = document.getElementById('customerChart');
    if (customerCtx) {
        new Chart(customerCtx, {
            type: 'bar',
            data: {
                labels: dashboardData.yearlyRevenue.map(item => item.month),
                datasets: [{
                    label: 'عدد العملاء',
                    data: dashboardData.yearlyRevenue.map(item => item.customers),
                    backgroundColor: 'rgba(168, 85, 247, 0.8)',
                    borderColor: '#a855f7',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// ===== SALES CHARTS =====
function initSalesCharts() {
    // Top Products Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
        new Chart(productsCtx, {
            type: 'doughnut',
            data: {
                labels: dashboardData.topProducts.map(item => item.name),
                datasets: [{
                    data: dashboardData.topProducts.map(item => item.revenue),
                    backgroundColor: [
                        '#22c55e',
                        '#3b82f6',
                        '#a855f7',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 3,
                    borderColor: '#1e293b'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f8fafc',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// ===== AI CHARTS =====
function initAICharts() {
    // AI Performance Chart
    const aiCtx = document.getElementById('aiChart');
    if (aiCtx) {
        new Chart(aiCtx, {
            type: 'radar',
            data: {
                labels: dashboardData.aiInsights.map(item => item.type),
                datasets: [{
                    label: 'دقة الأداء %',
                    data: dashboardData.aiInsights.map(item => item.accuracy),
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: '#ef4444',
                    borderWidth: 3,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc'
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(148, 163, 184, 0.2)'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.2)'
                        },
                        pointLabels: {
                            color: '#94a3b8'
                        },
                        ticks: {
                            color: '#94a3b8',
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });
    }
}

// ===== TIME FILTER FUNCTIONALITY =====
function updateDataBasedOnTimeFilter(period) {
    // Update all displayed data based on selected time period
    console.log(`Updating data for period: ${period}`);
    
    // Here you would typically fetch new data based on the period
    // For demo purposes, we'll just trigger animations
    initOverviewAnimations();
}

// ===== EXPORT FUNCTIONALITY =====
function exportDashboard() {
    // Create export data
    const exportData = {
        generatedAt: new Date().toISOString(),
        period: document.getElementById('timeFilter')?.value || 'month',
        data: dashboardData
    };

    // Convert to JSON and download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// ===== REAL-TIME UPDATES SIMULATION =====
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate small changes in key metrics
        const quickStats = document.querySelectorAll('.quick-stat .stat-value');
        quickStats.forEach(stat => {
            const currentValue = parseFloat(stat.textContent.replace(/[$,%]/g, ''));
            const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
            const newValue = currentValue * (1 + variation);
            
            if (stat.textContent.includes('$')) {
                stat.textContent = '$' + Math.round(newValue).toLocaleString();
            } else if (stat.textContent.includes('%')) {
                stat.textContent = Math.round(newValue) + '%';
            } else {
                stat.textContent = Math.round(newValue).toLocaleString();
            }
        });
    }, 30000); // Update every 30 seconds
}

// ===== RESPONSIVE CHART HANDLING =====
function handleResponsiveCharts() {
    window.addEventListener('resize', () => {
        // Trigger chart resize if charts exist
        if (window.Chart) {
            Object.values(Chart.instances).forEach(chart => {
                chart.resize();
            });
        }
    });
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
function initializeDashboard() {
    // Start real-time updates simulation
    setTimeout(simulateRealTimeUpdates, 5000);
    
    // Handle responsive charts
    handleResponsiveCharts();
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard); 