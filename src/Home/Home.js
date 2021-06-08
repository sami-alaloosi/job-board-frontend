import React from "react";
import remote from '../assets/remote.svg';
import { motion } from "framer-motion";
import {useHistory} from 'react-router-dom';
import fast from '../assets/fast.svg';
import track from '../assets/track.svg';
import getJob from '../assets/getjob.svg'; 

export default function Home(){
    const history = useHistory();
    const variantsImage = {
        hidden: {
            x: 1000,
            scale: 0
        },
        visible: {
            x: 0,
            scale: 1,
            transition: {duration: 0.7}
        }
    }

    return <div>
        <div className="columns">
        <div className="column">
            <div className="section is-medium">
                <h1 className="title is-2">Find Your dream Tech Job & work from Home With Remoti<span className="has-text-link">fy</span></h1>
                <h2 className="subtitle is-4 mt-1">We help developers & tech enthusiasts find their dream remote jobs, we will help you find yours!</h2>
                    <nav className="level">
                    <div className="level-item has-text-centered is-flex is-flex-direction-column">
                            <p className="heading">Engineers Served</p>
                            <p className="title">92,414</p>     
                    </div>   
                    </nav>
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-link">
                            Find Your Dream Job!
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={variantsImage}  className="column is-three-fifths" >
            <figure className="image is-fullwidth is-1by1">
            <img src={remote}></img>
            </figure>
        </motion.div>
 

    </div>
       <hr className="has-background-link-light"/>

        <div className="container">
        <div className="columns">
            <div className="column">
                <div className="box">
                    <h3 className="title is-6 has-text-centered">Front-End Jobs</h3>
                    <hr className="has-background-link-light"/>
                    <section className="container">
                        <p>
                        wether you have one or 10 years of experience of front end development we will help you find 
                        a client that will be suited to your skill & compensation requirments. We have helped over 30,000 
                        front end developers find their dream jobs already. Join Them!
                        </p>
                       <div className="field is-grouped is-grouped-centered mt-2">
                        <div className="control" onClick={()=>history.push("/jobs")}>
                            <button className="button is-link is-light">
                                Explore Front-End Jobs
                            </button>
                        </div>
                       </div>
                    </section>
                </div>
            </div>
            <div className="column">
                <div className="box">
                    <h3 className="title is-6 has-text-centered">Back-End Jobs</h3>
                    <hr className="has-background-link-light"/>
                    <section className="container">
                        <p>
                        Backend Development is in high demand right now. If you are a student in college looking for an internship with Java knowledge,
                        or a bootcamp graduate with NodeJs experience, we have helped many developers establish a succesful career as backend engineers
                        </p>
                       <div className="field is-grouped is-grouped-centered mt-2">
                        <div className="control" onClick={()=>history.push("/jobs")}>
                            <button className="button is-link is-light">
                                Explore Back-End Jobs
                            </button>
                        </div>
                       </div>
                    </section>
                </div>
            </div>
            <div className="column">
                <div className="box">
                    <h3 className="title is-6 has-text-centered">Cloud Architect Jobs</h3>
                    <hr className="has-background-link-light"/>
                    <section className="container">
                        <p>
                        The Cloud is the biggest trend, & not only is it a trend but its here to stay, we have helped over 25,000 cloud developers 
                        find their dream Cloud Architect jobs. Wether you are familiar with Azure, Google Cloud or AWS, we got your back! 
                        </p>
                       <div className="field is-grouped is-grouped-centered mt-2">
                        <div className="control" onClick={()=>history.push("/jobs")}>
                            <button className="button is-link is-light">
                                Explore Cloud Architect Jobs
                            </button>
                        </div>
                       </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    
    
    <h1 className="title has-text-centered is-3 mt-5">Features</h1>
    
    <section className="container">

        <div className="columns">
            <div className="column">
                <div className="section is-large">
                    <h1 className="title">We Respect Your Time!</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, provident eius! Maiores sequi nisi sapiente odio facilis, dicta explicabo nostrum, placeat nam excepturi illum nobis cupiditate provident illo rerum exercitationem quia officia sunt atque vitae unde! At sit minus facilis ea velit dolores impedit non dolore animi voluptatibus illum incidunt debitis, molestias ipsum quia? A vel harum ipsam debitis velit modi ex in vitae omnis, at necessitatibus quo deleniti nemo nihil doloribus, sed aut magni soluta!
                </p>
                </div>
            </div>
            <div className="column">
                <figure className="image is-fullwidth is-1by1">
                <img src={fast}></img>
                </figure>
            </div>
        </div>

        <div className="columns">
        <div className="column">
                <div className="section is-large">
                    <h1 className="title">Track Your Journey!</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, provident eius! Maiores sequi nisi sapiente odio facilis, dicta explicabo nostrum, placeat nam excepturi illum nobis cupiditate provident illo rerum exercitationem quia officia sunt atque vitae unde! At sit minus facilis ea velit dolores impedit non dolore animi voluptatibus illum incidunt debitis, molestias ipsum quia? A vel harum ipsam debitis velit modi ex in vitae omnis, at necessitatibus quo deleniti nemo nihil doloribus, sed aut magni soluta!
                </p>
                </div>
            </div>
            <div className="column">
                <figure className="image is-fullwidth is-1by1">
                <img src={track}></img>
                </figure>
            </div>
        </div>

        <div className="columns">
        <div className="column">
                <div className="section is-large">
                    <h1 className="title">In The End, You Win!</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, provident eius! Maiores sequi nisi sapiente odio facilis, dicta explicabo nostrum, placeat nam excepturi illum nobis cupiditate provident illo rerum exercitationem quia officia sunt atque vitae unde! At sit minus facilis ea velit dolores impedit non dolore animi voluptatibus illum incidunt debitis, molestias ipsum quia? A vel harum ipsam debitis velit modi ex in vitae omnis, at necessitatibus quo deleniti nemo nihil doloribus, sed aut magni soluta!
                </p>
                </div>
            </div>
            <div className="column">
                <figure className="image is-fullwidth is-1by1">
                <img src={getJob}></img>
                </figure>
            </div>
        </div>

    </section>


    <footer class="footer">
        <div class="content has-text-centered">
            <p>
            <a href="https://storyset.com/business">Illustration by Freepik Storyset</a>
            </p>
        </div>
    </footer>

</div>
};

// <a href="https://storyset.com/business">Illustration by Freepik Storyset</a>