import React from 'react';
import { LiaCertificateSolid } from 'react-icons/lia';
import { LuGraduationCap } from 'react-icons/lu';
import { MdOutlineVolunteerActivism } from 'react-icons/md';
import { PiHandshake } from 'react-icons/pi';
import Heading3 from '../Heading3';

const MembershipCount = () => {
  const members = [
    {
      id: 1,
      name: 'Graduate',
      number: '100+',
      icon: <LuGraduationCap />,
    },
    {
      id: 2,
      name: 'Associate',
      number: '40+',
      icon: <PiHandshake />,
    },
    {
      id: 3,
      name: 'Professional',
      number: '200+',
      icon: <LiaCertificateSolid />,
    },
    {
      id: 3,
      name: 'Cooperate',
      number: '40+',
      icon: <MdOutlineVolunteerActivism />,
    },
  ];
  return (
    <>
      <section className="bg-[#F8F8F8] py-20">
        <div className="max-w-[1440px] mx-auto md:px-20 px-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heading3 text={'Our Members'} style="" />
            <div className="h-0.5 w-40 bg-[#052440]"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-10 mt-10">
            {members.map((member, index) => (
              <div
                key={index}
                className="text-center flex flex-col items-center "
              >
                <div className="text-6xl text-[#052440]">{member.icon}</div>
                <p className="text-lg">{member.name}</p>
                <h4 className="text-4xl font-bold">{member.number}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipCount;
