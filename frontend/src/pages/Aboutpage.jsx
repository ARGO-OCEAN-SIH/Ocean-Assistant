import React from "react";
function AboutPage() {
    return (
        <div className="about-cont bg-light text-light mt-5">
            {/* Hero section */}
            <section>
                <div className="row"></div>
                <div className="container text-center mt-5 mb-5">
                    <h1 className="">About ARGO Ocean Data Explorer</h1>
                    <p>
                        AI-powered platform for discovering, analyzing, and visualizing ARGO ocean datasets.
                    </p>
                </div>
            </section>
            {/* Project description */}
            <section>
                <div className="container text-center shadow-lg mb-5">
                    <h2 className="fw-bold mt-4">Our Mission </h2>
                    <p className="fs-5">
                        Our mission is to blend cutting-edge technology with ocean intelligence — 
                        making exploration accessible, data transparent, and conversations seamless.
                         Whether you are a researcher, student, or enthusiast, Ocean Assistant is here to guide you.
                        Oceans drive Earth’s climate system. The ARGO project provides critical ocean
                        temperature, salinity, and depth profiles from thousands of floats worldwide.
                        <br />
                        Our tool makes this data interactive and accessible using conversational AI and
                        visualization.
                    </p>
                </div>
            </section>
            {/* Features */}
            <section>
                <div className="container ">
                    <h2 className="fw-bold mb-4 text-center">What you can do ?</h2>


                    <div className="container">

                    <div className="row g-4">
                    <div className="p-3 col-md-6 rounded shadow-sm h-100">
                    <p className="fs-5">🎙 Voice Mode - Talk to the assistant in real time.</p>
                    </div>
                     </div>
                    <div className="p-3 col-md-6 rounded shadow-sm h-100">
                    <p className="fs-5"> 💬 Chat Mode - Type your queries and get instant answers.</p>
                    </div>
            

                    <div className="row">
                    <div className="p-3 col-md-6 rounded shadow-sm h-100">
                    <p className="fs-5">🗺 Interactive Map - Visualize locations, patterns, or routes.</p>
                    </div>
                     </div>
                    <div className="p-3 col-md-6 rounded shadow-sm h-100">
                    <p className="fs-5">📊 Data Dashboard → Explore stats, insights, and trends.</p>
                    </div>
                     
                     <div className="p-3 col-md-6 rounded shadow-sm h-100">
                    <p className="fs-5 ">🤝 Partners → Connect with organizations and projects shaping ocean research.</p>
                    </div>
                    </div>
                </div>
            </section>
           
            {/* Hackathon Info */}
            <section className="bg-light py-4 text-center border-top text-dark">
                <div className="container">
                    <h4 className="fw-semibold">Smart India Hackathon 2025</h4>
                    <p className="mb-0">Problem Statement ID: SIH 25040 | Team: NovaMinds</p>
                </div>
            </section>

        </div>
    );
}

export default AboutPage;