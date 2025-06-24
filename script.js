// ✅✅✅ The Corrected script.js ✅✅✅

document.addEventListener('DOMContentLoaded', () => {

    // --- API & SUPABASE SETUP ---

    const SUPABASE_URL = 'https://pcqwsjrratkkunoqstzo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcXdzanJyYXRra3Vub3FzdHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODI1MjEsImV4cCI6MjA2NjM1ODUyMX0.NlxFEsmFJ5M2z32pBA8KgLoZ7EegNfo8KZmoJ7B69CE';
    
    // ============================================================================
    // THE FIX IS HERE: We create a variable named 'supabaseClient' to avoid conflict.
    // The library itself is 'supabase'. Our specific connection is 'supabaseClient'.
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // ============================================================================
    
    // --- MENU PAGE LOGIC ---
    const menuGrid = document.getElementById('menu-grid');
    if (menuGrid) {
        
        let allMeals = [];
        const fallbackImage = 'https://via.placeholder.com/320x200.png/f4f4f4/cccccc?text=Image+Not+Found';

        const displayMenuItems = (items) => {
            menuGrid.innerHTML = '';
            
            if (items.length === 0) {
                menuGrid.innerHTML = '<p>No meals found. Check your Supabase table for data.</p>';
                return;
            }

            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'menu-card';
                card.innerHTML = `
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        class="card-img" 
                        loading="lazy" 
                        onerror="this.onerror=null; this.src='${fallbackImage}';"
                    >
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price}</p>
                        <p class="description">${item.description}</p>
                    </div>
                `;
                menuGrid.appendChild(card);
            });
        };

        const loadMeals = async () => {
            menuGrid.innerHTML = '<p>Loading menu...</p>';

            try {
                // THE FIX IS ALSO HERE: We use our new 'supabaseClient' variable to make the call.
                const { data, error } = await supabaseClient
                    .from('meals')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) { throw error; }
                
                allMeals = data;
                displayMenuItems(allMeals);

            } catch (error) {
                console.error("Error fetching menu data:", error.message);
                menuGrid.innerHTML = `<p style="color: red; text-align: center;">Error: Could not load the menu. Please check your Supabase RLS policies and table name ('meals').</p>`;
            }
        };

        const filterBtns = document.querySelectorAll('.menu-filters button');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active-filter'));
                btn.classList.add('active-filter');

                const category = btn.getAttribute('data-category');
                
                if (category === 'All') {
                    displayMenuItems(allMeals);
                } else {
                    const filteredItems = allMeals.filter(item => item.category === category);
                    displayMenuItems(filteredItems);
                }
            });
        });

        loadMeals();
    }
});



document.addEventListener('DOMContentLoaded', () => {

    // (All your previous Supabase code can stay here)

    // =========================================
    // ✅✅✅ Mobile Navigation Logic ✅✅✅
    // =========================================
    const burgerMenuButton = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const closeNavButton = document.getElementById('close-btn');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    const openNav = () => {
        document.body.classList.add('mobile-nav-active');
    };

    const closeNav = () => {
        document.body.classList.remove('mobile-nav-active');
    };

    burgerMenuButton.addEventListener('click', openNav);
    closeNavButton.addEventListener('click', closeNav);

    // Close the menu when any of the navigation links are clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });
});