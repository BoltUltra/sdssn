import React, { useEffect, useState } from "react";
import Heading4 from "../Heading4";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const EventSlider = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!events) return <Loading />;

  return (
    <section className="bg-background">
      <div className="section-container">
        <Heading4 text={"Upcoming Events"} />
        <div className="slider-container mt-10">
          <Slider {...settings}>
            {events.map((event, index) => (
              <div key={index} className="event-slide">
                <Link href={`/news-and-event/events/${event.id}`} passHref>
                  <div className="event-link pr-5">
                    <Image
                      src={event.image}
                      alt={event.eventTitle}
                      height={100}
                      width={100}
                      className="event-image w-full"
                    />
                    {/* <p>{event.eventTitle}</p> */}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default EventSlider;
