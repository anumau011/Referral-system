import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LeaderboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: bold;

  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #333;
`;

const RankCell = styled(TableCell)`
  font-weight: bold;
  text-align: center;
  width: 60px;
`;

const RankBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => {
    if (props.rank === 1) return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
    if (props.rank === 2) return 'linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 100%)';
    if (props.rank === 3) return 'linear-gradient(135deg, #cd7f32 0%, #daa520 100%)';
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }};
  color: ${props => props.rank <= 3 ? '#333' : 'white'};
  font-weight: bold;
  font-size: 0.9rem;
`;

const NameCell = styled(TableCell)`
  font-weight: 600;
  color: #333;
`;

const CodeCell = styled(TableCell)`
  font-family: monospace;
  background: #f8f9fa;
  border-radius: 6px;
  color: #667eea;
  font-weight: bold;
`;

const AmountCell = styled(TableCell)`
  font-weight: bold;
  color: #4caf50;
  text-align: right;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff6b6b;
  background: #ffebee;
  border-radius: 8px;
  margin: 1rem 0;
`;

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/leaderboard');
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load leaderboard data');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LeaderboardContainer>
        <Card>
          <LoadingMessage>Loading leaderboard...</LoadingMessage>
        </Card>
      </LeaderboardContainer>
    );
  }

  if (error) {
    return (
      <LeaderboardContainer>
        <Card>
          <ErrorMessage>{error}</ErrorMessage>
        </Card>
      </LeaderboardContainer>
    );
  }

  return (
    <LeaderboardContainer>
      <Card>
        <Title>🏆 Top Referrers</Title>
        {data.length === 0 ? (
          <LoadingMessage>No data available</LoadingMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Referral Code</TableHeader>
                <TableHeader>Total Donations</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={item.referralCode || index}>
                  <RankCell>
                    <RankBadge rank={index + 1}>
                      {index + 1}
                    </RankBadge>
                  </RankCell>
                  <NameCell>{item.name}</NameCell>
                  <CodeCell>{item.referralCode}</CodeCell>
                  <AmountCell>${item.totalDonations}</AmountCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </LeaderboardContainer>
  );
}
