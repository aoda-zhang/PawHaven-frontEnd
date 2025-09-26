import { Button, TextareaAutosize } from '@mui/material';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  HandHelping,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../index.module.css';

interface RescueInteractionProps {
  animalId: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const RescueInteraction: React.FC<RescueInteractionProps> = () => {
  const { t } = useTranslation();
  const [commentContent, setCommentContent] = useState('');
  const [likes, setLikes] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'u1',
      userName: 'Volunteer A',
      avatar: '/assets/avatars/volunteer1.jpg',
      content:
        'I’ve seen this cat, it’s very friendly, already contacted a nearby pet hospital',
      timestamp: '2023-10-21T09:30:00',
      likes: 5,
    },
  ]);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('pawHaven.share_title'),
        text: t('pawHaven.share_text', { name: '动物名称' }),
        url: window.location.href,
      });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert(t('pawHaven.link_copied')));
    }
  };

  const handleRescue = () => {};

  return (
    <div
      className={`${styles.interactionContainer} bg-white rounded-lg shadow-md p-6 mt-6`}
    >
      {/* 操作按钮区 */}
      <div className={styles.actionButtons}>
        <Button
          variant="outlined"
          className={styles.actionButton}
          onClick={handleRescue}
        >
          <HandHelping size={18} className="mr-2" />
          {t('pawHaven.i_will_rescue')}
        </Button>

        <div className={styles.socialActions}>
          <button
            type="button"
            className={styles.socialButton}
            onClick={handleLike}
            aria-label={t('common.like')}
          >
            <Heart size={20} className={isLiked ? styles.liked : ''} />
            <span>{likes}</span>
          </button>

          <button
            type="button"
            className={styles.socialButton}
            // onClick={handleComment}
            aria-label={t('common.comment')}
          >
            <MessageSquare size={20} />
            <span>{comments.length}</span>
          </button>

          <button
            type="button"
            className={styles.socialButton}
            onClick={handleShare}
            aria-label={t('common.share')}
          >
            <Share2 size={20} />
          </button>

          <button
            type="button"
            className={styles.socialButton}
            onClick={handleBookmark}
            aria-label={t('common.bookmark')}
          >
            <Bookmark
              size={20}
              className={isBookmarked ? styles.bookmarked : ''}
            />
          </button>
        </div>
      </div>

      <div className={styles.commentsSection}>
        <h3 className={styles.commentsTitle}>{t('reportStray.comments')}</h3>

        <div className={styles.commentInputContainer}>
          <TextareaAutosize
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={t('reportStray.leave_comment_placeholder')}
            className={styles.commentInput}
            minRows={3}
          />
          <Button
            variant="contained"
            disabled={!commentContent.trim()}
            className={styles.submitComment}
          >
            {t('reportStray.submit')}
          </Button>
        </div>

        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <img
                src={comment.avatar}
                alt={comment.userName}
                className={styles.commentAvatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>
                    {comment.userName}
                  </span>
                  <span className={styles.commentTime}>
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className={styles.commentText}>{comment.content}</p>
                <button type="button" className={styles.commentLike}>
                  <Heart size={16} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RescueInteraction;
