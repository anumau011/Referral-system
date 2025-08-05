import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UsersContainer = styled.div`
  max-width: 1200px;
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

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const SearchFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterSelect = styled.select`
  padding: 0.8rem;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const UserCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const UserName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const UserEmail = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const UserReferralCode = styled.div`
  background: #667eea;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const UserDonations = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DonationAmount = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #4caf50;
`;

const JoinDate = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #667eea;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, sortBy]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/users?page=${currentPage}&limit=50`);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      setError('Failed to load users data');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    switch (sortBy) {
      case 'donations-high':
        filtered.sort((a, b) => b.totalDonations - a.totalDonations);
        break;
      case 'donations-low':
        filtered.sort((a, b) => a.totalDonations - b.totalDonations);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredUsers(filtered);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Referral code ${code} copied to clipboard!`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateStats = () => {
    const totalUsers = users.length;
    const totalDonations = users.reduce((sum, user) => sum + user.totalDonations, 0);
    const avgDonations = totalUsers > 0 ? Math.round(totalDonations / totalUsers) : 0;
    const topDonor = users.reduce((max, user) => 
      user.totalDonations > (max?.totalDonations || 0) ? user : max, null);

    return { totalUsers, totalDonations, avgDonations, topDonor };
  };

  if (loading) {
    return (
      <UsersContainer>
        <Card>
          <LoadingMessage>Loading users...</LoadingMessage>
        </Card>
      </UsersContainer>
    );
  }

  if (error) {
    return (
      <UsersContainer>
        <Card>
          <ErrorMessage>{error}</ErrorMessage>
        </Card>
      </UsersContainer>
    );
  }

  const stats = calculateStats();

  return (
    <UsersContainer>
      <Card>
        <Title>👥 All Users & Donations</Title>
        
        <StatsRow>
          <StatCard>
            <StatValue>{stats.totalUsers}</StatValue>
            <StatLabel>Total Users</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>${stats.totalDonations}</StatValue>
            <StatLabel>Total Donations</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>${stats.avgDonations}</StatValue>
            <StatLabel>Average per User</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.topDonor?.name || 'N/A'}</StatValue>
            <StatLabel>Top Donor</StatLabel>
          </StatCard>
        </StatsRow>

        <SearchFilter>
          <SearchInput
            type="text"
            placeholder="Search by name, email, or referral code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="donations-high">Highest Donations</option>
            <option value="donations-low">Lowest Donations</option>
            <option value="name">Name A-Z</option>
          </FilterSelect>
        </SearchFilter>

        {filteredUsers.length === 0 ? (
          <LoadingMessage>No users found matching your search.</LoadingMessage>
        ) : (
          <>
            <UsersGrid>
              {filteredUsers.map((user) => (
                <UserCard key={user.referralCode || user.email}>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                  <UserReferralCode onClick={() => copyToClipboard(user.referralCode)}>
                    {user.referralCode}
                  </UserReferralCode>
                  <UserDonations>
                    <DonationAmount>${user.totalDonations}</DonationAmount>
                    <JoinDate>Joined {formatDate(user.createdAt)}</JoinDate>
                  </UserDonations>
                </UserCard>
              ))}
            </UsersGrid>

            {pagination.totalPages > 1 && (
              <Pagination>
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                >
                  Previous
                </PaginationButton>
                <PaginationButton active>
                  {currentPage} of {pagination.totalPages}
                </PaginationButton>
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNext}
                >
                  Next
                </PaginationButton>
              </Pagination>
            )}
          </>
        )}
      </Card>
    </UsersContainer>
  );
}
