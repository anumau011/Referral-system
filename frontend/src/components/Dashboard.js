import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_URLS } from '../config/api';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ReferralCode = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-family: monospace;
  font-size: 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const RewardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.unlocked ? '#e8f5e8' : '#f5f5f5'};
  border-radius: 10px;
  border-left: 4px solid ${props => props.unlocked ? '#4caf50' : '#ddd'};
`;

const RewardIcon = styled.div`
  font-size: 1.5rem;
`;

const RewardText = styled.div`
  flex: 1;
`;

const RewardTitle = styled.div`
  font-weight: bold;
  color: ${props => props.unlocked ? '#4caf50' : '#666'};
`;

const RewardDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const DonateSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const DonateButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const DonateInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #e1e1e1;
  border-radius: 6px;
  width: 100px;
`;

export default function Dashboard({ user }) {
  const [donationAmount, setDonationAmount] = useState('');
  const [currentUser, setCurrentUser] = useState(user);

  const rewards = [
    { id: 1, title: 'Welcome Badge', description: 'Join the platform', threshold: 0, icon: '🎉' },
    { id: 2, title: 'Bronze Referrer', description: 'Raise $500', threshold: 500, icon: '🥉' },
    { id: 3, title: 'Silver Champion', description: 'Raise $1000', threshold: 1000, icon: '🥈' },
    { id: 4, title: 'Gold Master', description: 'Raise $2000', threshold: 2000, icon: '🥇' },
    { id: 5, title: 'Diamond Elite', description: 'Raise $5000', threshold: 5000, icon: '💎' }
  ];

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) return;
    
    try {
      const response = await axios.put(
        API_URLS.USER_DONATE(currentUser.referralCode),
        { amount: parseInt(donationAmount) }
      );
      setCurrentUser(response.data);
      setDonationAmount('');
    } catch (error) {
      // Fallback for demo
      setCurrentUser({
        ...currentUser,
        totalDonations: currentUser.totalDonations + parseInt(donationAmount)
      });
      setDonationAmount('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <DashboardContainer>
      <Grid>
        <Card>
          <CardTitle>👤 Intern Profile</CardTitle>
          <StatValue>{currentUser.name}</StatValue>
          <StatLabel>Active Referrer</StatLabel>
        </Card>

        <Card>
          <CardTitle>💰 Total Donations</CardTitle>
          <StatValue>${currentUser.totalDonations}</StatValue>
          <StatLabel>Raised through referrals</StatLabel>
        </Card>

        <Card>
          <CardTitle>🔗 Your Referral Code</CardTitle>
          <ReferralCode onClick={copyToClipboard}>
            {currentUser.referralCode}
          </ReferralCode>
          <StatLabel>Click to copy • Share with friends!</StatLabel>
        </Card>
      </Grid>

      <Card>
        <CardTitle>🏆 Rewards & Achievements</CardTitle>
        <RewardsList>
          {rewards.map(reward => (
            <RewardItem 
              key={reward.id} 
              unlocked={currentUser.totalDonations >= reward.threshold}
            >
              <RewardIcon>{reward.icon}</RewardIcon>
              <RewardText>
                <RewardTitle unlocked={currentUser.totalDonations >= reward.threshold}>
                  {reward.title}
                </RewardTitle>
                <RewardDescription>{reward.description}</RewardDescription>
              </RewardText>
              {currentUser.totalDonations >= reward.threshold && (
                <div style={{ color: '#4caf50', fontWeight: 'bold' }}>✓ UNLOCKED</div>
              )}
            </RewardItem>
          ))}
        </RewardsList>
      </Card>

      <DonateSection>
        <CardTitle>💸 Simulate Donation (Demo)</CardTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Add $</span>
          <DonateInput
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Amount"
          />
          <DonateButton onClick={handleDonate}>
            Add Donation
          </DonateButton>
        </div>
      </DonateSection>
    </DashboardContainer>
  );
}
