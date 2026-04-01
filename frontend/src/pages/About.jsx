import React from "react";
import Navbar from "../components/Navbar";
function About() {
    return (
        <div className="about-cont bg-light text-dark mt-5">
            {/* <!-- About Section --> */}
            <Navbar/>
            <section class="section-padding mt-5">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6 mt-5">
                            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" class="img-fluid rounded shadow"/>
                        </div>
                        <div class="col-md-6">
                            <h2 class="fw-bold mb-3">About The Project</h2>
                            <p>
                                This AI-powered conversational platform transforms complex oceanographic data into
                                interactive and intuitive insights. Using ARGO float datasets, the system enables users
                                to explore ocean temperature, salinity, and climate patterns using natural language queries.
                            </p>
                            <p>
                                The platform integrates machine learning, conversational AI, and real-time data visualization
                                to create a seamless experience for researchers, students, and climate enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-padding">
                <div class="container">
                    <div class="row align-items-center mt-5 mb-3">
                        <div class="col-md-6">
                              <h2 class="fw-bold mb-3">Understanding the Ocean's Role in Earth's Climate</h2>
                            <h3 class="fw-bold mb-3">Argo helps us observe our changing climate</h3>
                            <p>
                                Argo provides scientists with measurements of the evolving state of the upper ocean by 
                                collecting temperature and salinity profiles from the surface to 2,000 meters depth.
                            </p>
                            <p>
                                Real-time Argo data improves weather and climate forecasts through the assimilation of 
                                Argo data in ocean and coupled (ocean and atmosphere) forecast models.
                            </p>
                            <p>
                                Using Argo measurements, scientists can calculate how and where ocean heat content
                                 is changing. Since seawater expands as it warms, its contribution to sea level rise can also be estimated.
                            </p>   
                        </div>
                        <div class="col-md-6">
                              <img src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG9jZWFufGVufDB8fDB8fHwy" class="img-fluid rounded shadow" /> 
                        </div>
                    </div>
                </div>
            </section>

           <section class="section-padding mt-5 mb-5">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6 mt-5">
                            <img src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9jZWFufGVufDB8fDB8fHwy" class="img-fluid rounded shadow"/>
                        </div>
                        <div class="col-md-6">
                            <h2 class="fw-bold mb-3">Argo ocean data used by scientists</h2>
                            <p>
                               <b>1.Climate change monitoring</b>
                            </p>
                            <p>
                               <b>2.Ocean Forecasting</b>
                            </p>
                            <p>
                               <b>3.Ocean Circulation Studies</b>
                            </p>
                            <p>
                               <b>4.Biogechemical Research</b>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Features Section --> */}

            <section class="bg-light section-padding">
                <div class="container text-center">

                    <h2 class="fw-bold">Key Features</h2>

                    <div class="row g-4">

                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">

                                <div class="feature-icon">🤖</div>

                                <h4>Conversational AI</h4>

                                <p>
                                    Ask natural language questions and receive intelligent responses powered by AI models.
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">🌊</div>
                                <h4>ARGO Float Visualization</h4>
                                <p>
                                    Track global ARGO floats and explore real-time oceanographic measurements.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>Climate Insights</h4>
                                <p>
                                    Analyze temperature trends, salinity variations, and ocean climate patterns.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>Interactive Map Section</h4>
                                <p>
                                    Analyze World map.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>AI-Driven Oceanographic Insights</h4>
                                <p>
                                    Leverage AI models to generate intelligent summaries and predictive insights from ocean data.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>Historical Data Analysis</h4>
                                <p>
                                    Allow users to explore historical ARGO float datasets to identify long-term ocean trends.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>AI & Intelligent Features</h4>
                                <p>
                                    Implement an NLP-powered interface that converts user queries into structured data requests.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>Region-Based Filtering & Search</h4>
                                <p>
                                   
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>Research & Scientific Features</h4>
                                <p>
                                    <b>Multi-Parameter Ocean Analysis</b>
                                    Allow comparison across multiple ocean parameters:Temperature, Salinity, Pressure, Depth.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-4 shadow card-hover mt-5 mb-5">
                                <div class="feature-icon ">📊</div>
                                <h4>User Experience Features</h4>
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- How It Works --> */}

            <section class="section-padding">
                <div class="container text-center">

                    <h2 class="fw-bold mb-5 mt-5">How It Works</h2>

                    <div class="row">

                        <div class="col-md-4">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                                class="img-fluid rounded mb-3" />
                            <h5>Data Collection</h5>
                            <p>ARGO float data is gathered from global ocean monitoring systems.</p>
                        </div>

                        <div class="col-md-4">
                            <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c"
                                class="img-fluid rounded mb-3" />
                            <h5>AI Processing</h5>
                            <p>AI models analyze and interpret oceanographic datasets.</p>
                        </div>

                        <div class="col-md-4">
                            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
                                class="img-fluid rounded mb-3" />
                            <h5>Interactive Insights</h5>
                            <p>Users interact via chat and visualize ocean data dynamically.</p>
                        </div>

                    </div>

                </div>
            </section>
            {/* <!-- Team Section --> */}
               
           {/* <section class="bg-light section-padding">  */}
                {/* <div class="container text-center"> */}

                    {/* <h2 class="fw-bold mb-5">Our Team</h2> */}

                    {/* <div class="row g-4"> */}

                        {/* <div class="col-md-4">
                            <div class="card shadow">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg"
                                    class="card-img-top team-img" />
                                <div class="card-body">
                                    <h5>AI Developer</h5>
                                    <p>Machine Learning & Backend Development</p>
                                </div>
                            </div>
                        </div> */}


                        {/* <div class="col-md-4">
                            <div class="card shadow">
                                <img src="https://randomuser.me/api/portraits/women/45.jpg"
                                    class="card-img-top team-img" />
                                <div class="card-body">
                                    <h5>Frontend Developer</h5>
                                    <p>UI/UX & Visualization</p>
                                </div>
                            </div>
                        </div> */}


                        {/* <div class="col-md-4">
                            <div class="card shadow">
                                <img src="https://randomuser.me/api/portraits/men/67.jpg"
                                    class="card-img-top team-img" />
                                <div class="card-body">
                                    <h5>Data Engineer</h5>
                                    <p>Data Processing & Analytics</p>
                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                 {/* </div> */}
             {/* </section>  */}
            <footer class="bg-dark text-white text-center p-4">
                <p class="mb-0">
                    © 2026 ARGO AI | AI-Powered Ocean Intelligence Platform
                </p>
            </footer>
        </div>
    );
}

export default About;