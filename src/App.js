import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const UserListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Username = styled.h3`
  margin: 10px 0;
  color: #333;
`;

const Stat = styled.p`
  color: #666;
`;

const ProfileLink = styled.a`
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.github.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>GitHub Users</Title>
      {loading ? <p>Loading.</p> : (
        <UserListContainer>
          {users.map((user) => (
            <UserCard key={user.id}>
              <Avatar src={user.avatar_url} alt={`${user.login}'s avatar`} />
              <Username>{user.login}</Username>
              <Stat>Followers: {user.followers}</Stat>
              <Stat>Repositories: {user.public_repos}</Stat>
              <ProfileLink href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </ProfileLink>
            </UserCard>
          ))}
        </UserListContainer>
      )}
      <h4>Developed by Surya</h4>
    </Container>
  );
};

export default App;
