import React, { Component } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { FiMapPin } from 'react-icons/fi';
import { LuMenu } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from 'axios';
import './App.css';


// Recommended Events Component
class RecommendedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedEvents: []
    };
  }

  componentDidMount() {
    // Fetch recommended events from API
    axios.get('https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco')
      .then(response => {
        this.setState({ recommendedEvents: response.data.events});
      })
      .catch(error => {
        console.error('Error fetching recommended events: ', error);
      });
  }

  // Recommended Events Component
  render() {
    const { recommendedEvents } = this.state;

    // Configuration for the responsive carousel
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    return (
      <div className="recommended-events-container">
        <div className='heading-container'>
          <h2 className="section-heading">Recommended Events<span><FaArrowRightLong size={16} color='white'className='iicon'/></span></h2> 
        </div>
        <div className="recommended-events">
          {recommendedEvents.length > 0 ? (
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container"
              // customButtonGroup={<button>Custom button</button>}
              draggable
              focusOnSelect={false}
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside
              
              slidesToSlide={1}
              swipeable
            >
              {recommendedEvents.map((event, index) => (
                <div key={index} className="slide-container">
                  {/* <img src={event.imgUrl} alt={event.eventName} className="event-thumbnail" /> */}
                  <img loading='lazy' className='recommended-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvetnLOz5AF4JPJGxqw0EJpwpBHl9swwqww&s' alt='dummy'/>
                  <div className='weather-container'>
                    <div className='container'>
                      <h3 className="name">{event.eventName}</h3>
                      <p>March 23, 2024</p> 
                    </div>
                    <div className='container'>
                      <p className="event-location">{event.cityName}</p>
                      <p>Snowy 20 deg|42Km</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No recommended events available</p>
          )}
        </div>
      </div>
    );
  }
}


// Upcoming Events Component
class UpcomingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
      loading: false
    };
    this.page = 1;
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchEvents() {
    // Fetch upcoming events from API
    this.setState({ loading: true });
    axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${this.page}&type=upcoming`)
      .then(response => {
        this.setState(prevState => ({
          upcomingEvents: [...prevState.upcomingEvents, ...response.data.events],
          loading: false
        }));
        this.page++;
      })
      .catch(error => {
        console.error('Error fetching upcoming events: ', error);
        this.setState({ loading: false });
      });
  }

  handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && !this.state.loading) {
      this.fetchEvents();
    }
  }

  render() {
    const { upcomingEvents, loading } = this.state;
  
    return (
      <div className="upcoming-events-container">
        <div className='heading-container upcome-head'>
          <h2 className="upcoming-heading">Upcoming Events</h2>
          <FaArrowRightLong size={16} color='black'className='iicon'/>
        </div>
        <div className="upcoming-events image-container">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div key={event.eventName} className="event-card card">
                {/* <img src={event.imgUrl} loading="lazy" alt={event.eventName} className="event-thumbnail" /> */}
                <div className='images-container'>
                  <img loading="lazy" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96X5mINOxWReWxTnroX86EtuM0doJnsimpnCu-O9IHQ&s' alt='dummy' className='upcoming-image'/>
                  <div className="date">March,23</div>
                </div>
                <div className='upcome-details'>
                  <h3 className="event-name">{event.eventName}</h3>
                  <div className='weather'>
                    <p className="event-location"><span><FiMapPin size={10} color="grey" className='icon'/></span>{event.cityName}</p>
                    <p>Snowy|42Km</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming events available</p>
          )}
        </div>
        {loading && <div className="loading-spinner">Loading...</div>}
      </div>
    );
  }
}

// App Component
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <div className='main-head-container'>
            <div className='device-main-head-container'>
            <div className='device'>
              <div className='logo-container'>
                <h1 className="logo">BookUsNow</h1>
                <div className='location-container'>
                  <FiMapPin size={16} color="grey" className='icon'/>
                  <p>Hyderabad,India.</p>
                  <FaChevronRight color="grey" className='icon icon1'/>
                </div>
              </div>
              <div className='icons-container iicons-container'>
                  <FaSearch size={16}/>
                  <MdFavorite size={16} color='grey' className='fav-icon'/>
                  <IoIosContact size={20} color='grey' className='contact-icon'/>
              </div> 
            </div>
            <div className='device-list-container'>
                <ul className='de-list-container'>
                  <li className='lists'>Live Shows</li>
                  <li className='lists'>Streams</li>
                  <li className='lists'>Movies</li>
                  <li className='lists'>Plays</li>
                  <li className='lists'>Events</li>
                  <li className='lists'>Sports</li>
                  <li className='lists'>Activities</li>
                </ul>
              </div>
            </div>
            <div>
              <div className='nav-container'>
                <div className='cat-search-container'>
                  <div className='categories-container'>
                    <LuMenu size={16} className='menu-icon' color="white"/>
                    <p className='cat'>Categories</p>
                  </div>
                  <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button">
                      <FaSearch size={16}/>
                    </button>
                  </div>
                </div>
                <div className='fav-container'>
                  <MdFavorite size={16} color='grey' className='fav-icon'/>
                  <p className='fav'>Favourite</p>
                </div> 
                <div className='btn-container'>
                  <button className='btn'>Sign In</button>
                  <IoIosContact size={20} color='grey' className='contact-icon'/>
                </div> 
              </div>
              <div className='main-list-container'>
                <ul className='list-container'>
                  <li className='list'>Live Shows</li>
                  <li className='list'>Streams</li>
                  <li className='list'>Movies</li>
                  <li className='list'>Plays</li>
                  <li className='list'>Events</li>
                  <li className='list'>Sports</li>
                  <li className='list'>Activities</li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className='banner-container'>
            <div className='banner-image'>
              <div className='banner-text'>
                <h1>Disacover Existing Events Happening Near You- Stay Tuned For Updates</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              </div>
              <RecommendedEvents />
            </div>
            
          </div>
          
          <UpcomingEvents />
        </main>
        <footer>
          <p>&copy; 2024 BookUsNow</p>
        </footer>
      </div>
    );
  }
} 



export default App;
