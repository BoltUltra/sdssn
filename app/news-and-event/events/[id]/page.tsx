"use client";
import { Footer, Header, Loading } from "@/app/components";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import OtherEvents from "@/app/components/NewsAndEvents/OtherEvents";
import { FaComment, FaHeart } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

const SingleEvent = () => {
  const { id } = useParams(); // Correct way to get the 'id'

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the event data using the id
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          const foundEvent = data.events.find(
            (event) => event.id === Number(id)
          );
          // console.log("foundEvent", foundEvent);
          setEvent(foundEvent);
        })
        .catch((error) => console.error("Error fetching event data:", error));
    }
  }, [id]);

  if (!event) return <Loading />;

  return (
    <>
      <Header />
      <section className="py-32">
        <div className="section-container">
          <Image
            src={event.image}
            alt={event.eventTitle}
            width={600}
            height={400}
            className="event-image w-full"
          />
          <div className="space-y-5 mt-5">
            <h1 className="text-3xl font-bold">{event.eventTitle}</h1>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Details:</strong> {event.eventDetails}
            </p>
          </div>
          <div className="flex items-center justify-end my-20 text-lg">
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-3">
                <FaHeart />
                <span>{event.likes}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaComment />
                <span>{event.comments.length}</span>
              </div>
              <div className="flex items-center space-x-3">
                <IoShareSocial />
                <span>{event.shares}</span>
              </div>
            </div>
          </div>
          <div className="comments-section mt-10">
            <h2 className="text-2xl font-bold mb-5">Comments</h2>
            {event.comments.map((comment, index) => (
              <div key={index} className="comment mb-5 p-5">
                <div className="flex items-center mb-3">
                  <Image
                    src={comment.image}
                    alt={comment.user}
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-bold">{comment.user}</p>
                    <p className="text-xs text-gray-500 mb-3">{comment.date}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OtherEvents />
      <Footer />
    </>
  );
};

export default SingleEvent;
