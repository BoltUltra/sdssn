import React from "react";
import MapWithUsers from "../Map";
import Image from "next/image";
import Heading4 from "../Heading4";

const Hero = () => {
  return (
    <section className="pt-44 pb-20 md:text-left text-center about text-white">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5">
        <Heading4
          text={"Spatial Data Science Society Of Nigeria (SDSSN)"}
          className={"semibold mb-6 text-center"}
        />
        <div className="space-y-4 md:text-base text-sm md:max-w-6xl mx-auto text-justify">
          <p>
            Established in 2020, serves as a dynamic and innovative platform
            that fosters collaboration among geospatial and data science
            professionals across Nigeria and the African continent. SDSSN is
            dedicated to advancing the application of spatial data science by
            bridging the gap between the acquisition of geospatial skills and
            their practical implementation in high-impact projects that address
            critical challenges. At the core of its mission is the integration
            of data and spatial intelligence to drive development and
            decision-making across various sectors.
          </p>

          <p>
            SDSSN is not merely a forum for learning and networking; it is a hub
            for strategic partnerships and innovation, where professionals
            connect to develop solutions with geospatial technologies and data
            analytics. The society promotes a culture of knowledge-sharing and
            collaboration, offering a variety of membership categories that
            cater to individuals at different stages of their professional
            journey. Membership categories include Patrons, Board of Directors,
            Certified Members, Registered Members, and Volunteers, each offering
            unique benefits, such as access to specialized training,
            professional development, and opportunities to contribute to
            impactful projects.
          </p>
          <p>
            The leadership structure of SDSSN is designed to ensure regional
            representation and effective governance. Regional coordinators,
            project leaders, and teams specializing in communication, content
            creation, and training work together to organize workshops, manage
            projects, and facilitate knowledge dissemination. This structure
            enables the society to operate efficiently at both national and
            regional levels, ensuring that its impact is felt across Nigeria and
            beyond.
          </p>

          <p>
            SDSSN is committed to driving progress in critical areas of data
            science and geospatial analysis. Its specialized forums cover key
            topics such as Data Engineering, Spatial Analysis, Visualization and
            Exploration, Machine Learning and Artificial Intelligence, Big Data
            Analytics, and Modelling and Scripting. These forums not only
            provide a platform for technical discussions and capacity-building
            but also foster innovation by encouraging the practical application
            of cutting-edge technologies to solve real-world problems.
          </p>
          <p>
            Through its diverse membership, SDSSN continues to shape the future
            of geospatial data science in Africa, empowering professionals and
            organizations to harness the full potential of spatial data in
            decision-making and development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
