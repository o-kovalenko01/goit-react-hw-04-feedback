import React, { useState } from 'react';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from '../Feedback/FeedbackOptions';
import { Notification } from '../Notification/Notification';

import style from './App.module.css';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : ((feedback.good / total) * 100).toFixed(0);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const hasFeedback = totalFeedback > 0;

  return (
    <div className={style.wrapper}>
      <h1>Feedback App</h1>
      <FeedbackOptions
        options={Object.keys(feedback)}
        onLeaveFeedback={handleFeedback}
      />{' '}
      {hasFeedback ? (
        <Statistics
          good={feedback.good}
          neutra={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
