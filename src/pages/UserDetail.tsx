import type { Skill } from "@/types/skillTypes";
import type { User } from "@/types/userTypes";
import { getSkillsByUserId, getUserById } from "@/utils/supabaseFunctions";
import {
  Box,
  Heading,
  Link,
  Text,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetail = () => {
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    const getSkills = async () => {
      setLoading(true);
      try {
        const skills = await getSkillsByUserId(id);
        setSkills(skills);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    getUser();
    getSkills();
  }, [id]);

  if (!id) return <div>not found</div>;
  if (loading) return <div>loading...</div>;
  if (!user) return <div>not found</div>;

  return (
    <Flex minH="100vh" align="center" justify="center" p={4} bg="gray.50">
      <Box
        w="full"
        maxW="sm"
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={8}
      >
        <Heading as="h1" size="lg" mb={2} textAlign="left">
          {user.name}
        </Heading>
        <Text color="gray.600" mb={6} textAlign="left">
          <div
            dangerouslySetInnerHTML={{
              __html: user.description,
            }}
          />
        </Text>

        <Box mb={6}>
          <Text fontSize="sm" color="gray.500" mb={2} textAlign="left">
            スキル
          </Text>
          <Flex wrap="wrap" gap={2}>
            {skills.map((skill) => (
              <Badge key={skill.id} colorScheme="blue">
                {skill.name}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Flex gap={3} justify="center">
          {user.github_id ? (
            <Link
              href={user.github_id}
              target="_blank"
              _hover={{ textDecoration: "none" }}
            >
              <Button size="sm" variant="outline">
                GitHub
              </Button>
            </Link>
          ) : null}
          {user.qiita_id ? (
            <Link
              href={user.qiita_id}
              target="_blank"
              _hover={{ textDecoration: "none" }}
            >
              <Button size="sm" variant="outline">
                Qiita
              </Button>
            </Link>
          ) : null}
          {user.x_id ? (
            <Link
              href={user.x_id}
              target="_blank"
              _hover={{ textDecoration: "none" }}
            >
              <Button size="sm" variant="outline">
                X
              </Button>
            </Link>
          ) : null}
        </Flex>
      </Box>
      <Button onClick={() => navigate("/")}>ホームに戻る</Button>
    </Flex>
  );
};
