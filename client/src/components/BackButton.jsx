import React from 'react';
import '../styles/BackButton.scss';

function BackButton({ onClick }) {
  return (
    <button className="back_btn" type="button" onClick={onClick}>
      <img src="/icons/icon_arrow_left.svg" alt="back" />
    </button>
  );
}

export default BackButton;
