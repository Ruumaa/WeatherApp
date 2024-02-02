import React from 'react';

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex">
      <span className="loading loading-dots loading-lg mx-auto itemsa-center h-screen text-orange-700"></span>
    </div>
  );
}
