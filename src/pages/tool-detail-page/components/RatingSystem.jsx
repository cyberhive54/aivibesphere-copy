import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RatingSystem = ({ tool, onSubmitRating, userRating, isAuthenticated }) => {
  const [selectedRating, setSelectedRating] = useState(userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRating) return;

    setIsSubmitting(true);
    try {
      await onSubmitRating({
        rating: selectedRating,
        comment: comment.trim(),
        toolId: tool.id
      });
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (interactive = false) => {
    const stars = [];
    const displayRating = interactive ? (hoverRating || selectedRating) : selectedRating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          disabled={!interactive || !isAuthenticated}
          onClick={() => interactive && setSelectedRating(i)}
          onMouseEnter={() => interactive && setHoverRating(i)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'hover:scale-110 smooth-transition' : ''} ${
            !interactive || !isAuthenticated ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <Icon
            name="Star"
            size={24}
            className={`${
              i <= displayRating
                ? 'text-yellow-400 fill-current' :'text-gray-600 hover:text-yellow-300'
            } smooth-transition`}
          />
        </button>
      );
    }
    return stars;
  };

  if (!isAuthenticated) {
    return (
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Rate this Tool</h3>
        <div className="text-center py-8">
          <Icon name="Lock" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-4">
            Please sign in to rate and review this tool
          </p>
          <Button variant="primary" iconName="LogIn">
            Sign In to Rate
          </Button>
        </div>
      </div>
    );
  }

  if (userRating) {
    return (
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Your Rating</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(false)}
          </div>
          <span className="text-text-primary font-medium">
            {selectedRating} out of 5 stars
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          Thank you for rating this tool! You can update your rating anytime.
        </p>
        <Button
          variant="outline"
          iconName="Edit"
          onClick={() => setSelectedRating(0)}
        >
          Update Rating
        </Button>
      </div>
    );
  }

  return (
    <div className="neumorphic-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Rate this Tool</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-text-primary font-medium mb-3">
            Your Rating *
          </label>
          <div className="flex items-center gap-2 mb-2">
            {renderStars(true)}
          </div>
          {selectedRating > 0 && (
            <p className="text-text-secondary text-sm">
              {selectedRating === 1 && "Poor - This tool didn't meet expectations"}
              {selectedRating === 2 && "Fair - Below average performance"}
              {selectedRating === 3 && "Good - Meets basic requirements"}
              {selectedRating === 4 && "Very Good - Exceeds expectations"}
              {selectedRating === 5 && "Excellent - Outstanding tool!"}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-text-primary font-medium mb-3">
            Your Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this tool..."
            rows={4}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-primary focus:outline-none smooth-transition resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-text-muted text-sm">
              Help others by sharing your experience
            </span>
            <span className="text-text-muted text-sm">
              {comment.length}/500
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={!selectedRating || isSubmitting}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
          
          {selectedRating > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSelectedRating(0);
                setComment('');
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Rating Guidelines */}
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="Info" size={16} className="text-primary" />
            Rating Guidelines
          </h4>
          <ul className="text-text-secondary text-sm space-y-1">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Focus on the tool's features and performance</li>
            <li>• Avoid personal attacks or inappropriate language</li>
            <li>• You can update your rating anytime</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default RatingSystem;