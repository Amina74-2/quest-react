import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ant design imports
import { Card, Button, Flex, Descriptions, Modal, Typography, Radio, Steps, Statistic, Row } from 'antd';
import {
    SolutionOutlined,
    ProfileOutlined,
    BulbTwoTone,
    CheckCircleOutlined,
    ProjectOutlined,
    ReconciliationOutlined,
    SmileOutlined,
    SmileTwoTone,
    MehTwoTone,
    FrownTwoTone,
    DislikeTwoTone
} from '@ant-design/icons';

//declared consts
const { Text } = Typography;
const { Step } = Steps;

const Questionnaire = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const questions = [
        {
            id: 1,
            question: 'Genre :',
            options: [
                { answer: 'Masculin', score: 0 },
                { answer: 'Féminin', score: 0 },
            ],
        },
        {
            id: 2,
            question: 'Âge :',
            options: [
                { answer: 'Moins de 18 ans', score: 0 },
                { answer: '18-25 ans', score: 0 },
                { answer: '26-35 ans', score: 0 },
                { answer: '36-45 ans', score: 0 },
                { answer: '46-55 ans', score: 0 },
                { answer: '56 ans et plus', score: 0 },
            ],
        },
        {
            id: 3,
            question: 'État civil :',
            options: [
                { answer: 'Célibataire', score: 0 },
                { answer: 'Marié(e)', score: 0 },
                { answer: 'Divorcé(e)', score: 0 },
                { answer: 'Veuf/Veuve', score: 0 },
            ],
        },
        {
            id: 4,
            question: "Niveau d'éducation :",
            options: [
                { answer: 'Études primaires', score: 0 },
                { answer: 'Études secondaires', score: 0 },
                { answer: 'Études supérieures (Baccalauréat, Licence, Master)', score: 0 },
                { answer: 'Études postdoctorales (Doctorat)', score: 0 },
            ],
        },
        {
            id: 5,
            question: 'Situation professionnelle :',
            options: [
                { answer: 'Étudiant', score: 0 },
                { answer: 'Employé à plein temps', score: 0 },
                { answer: 'Employé à temps partiel', score: 0 },
                { answer: 'Indépendant/Entrepreneur', score: 0 },
                { answer: 'Sans emploi', score: 0 },
                { answer: 'Retraité(e)', score: 0 },
            ],
        },
        {
            id: 6,
            question: 'Revenu annuel :',
            options: [
                { answer: 'Moins de 10 000 DA', score: 0 },
                { answer: '10 000 DA - 30 000 DA', score: 0 },
                { answer: '30 000 DA - 60 000 DA', score: 0 },
                { answer: '60 000 DA - 90 000 DA', score: 0 },
                { answer: 'Plus de 90 000 DA', score: 0 },
            ],
        },
        {
            id: 7,
            question: 'À quelle fréquence jouez-vous aux jeux vidéo ?',
            options: [
                { answer: "Moins d'une heure par jour", score: 0.25 },
                { answer: '1 à 2 heures par jour', score: 0.5 },
                { answer: '2 à 4 heures par jour', score: 0.75 },
                { answer: 'Plus de 4 heures par jour', score: 1 },
            ],
        },
        {
            id: 8,
            question: 'Quelle importance accordiez-vous aux jeux vidéo par rapport à d\'autres activités ?',
            options: [
                { answer: 'Moins importante', score: 0.25 },
                { answer: 'Aussi importante', score: 0.5 },
                { answer: 'Plus importante', score: 0.75 },
            ],
        },
        {
            id: 9,
            question: 'Quel est l\'impact des jeux vidéo sur vos relations sociales ?',
            options: [
                { answer: 'Aucun impact', score: 0.25 },
                { answer: 'Légère altération (moins de contact)', score: 0.5 },
                { answer: 'Impact significatif (relations négligées)', score: 0.75 },
            ],
        },
        {
            id: 10,
            question: 'Avez-vous déjà menti à propos du temps passé à jouer aux jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 11,
            question: 'Comment réagissez-vous lorsque vous ne pouvez pas jouer aux jeux vidéo ?',
            options: [
                { answer: 'Aucune réaction particulière', score: 0.25 },
                { answer: 'Légère déception', score: 0.5 },
                { answer: 'Irritabilité ou frustration', score: 0.75 },
                { answer: 'Besoin urgent de jouer', score: 1 },
            ],
        },
        {
            id: 12,
            question: 'Avez-vous déjà ressenti un besoin croissant de jouer pour obtenir la même sensation de plaisir ou d\'excitation ?',
            options: [
                { answer: 'Non, jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 13,
            question: 'Dans quelle mesure les jeux vidéo affectent-ils votre sommeil ?',
            options: [
                { answer: 'Aucun impact', score: 0.25 },
                { answer: 'Légère perturbation', score: 0.5 },
                { answer: 'Insomnie occasionnelle', score: 0.75 },
                { answer: 'Insomnie fréquente', score: 1 },
            ],
        },
        {
            id: 14,
            question: 'Avez-vous déjà négligé des responsabilités professionnelles ou scolaires à cause des jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 15,
            question: 'Avez-vous essayé de réduire votre temps de jeu sans succès ?',
            options: [
                { answer: 'Oui, avec succès', score: 0.25 },
                { answer: 'Oui, mais sans succès', score: 0.5 },
                { answer: 'Non, je n\'ai pas essayé', score: 0.75 },
            ],
        },
        {
            id: 16,
            question: 'Comment vous sentez-vous lorsque vous ne jouez pas aux jeux vidéo pendant une longue période ?',
            options: [
                { answer: 'Indifférent', score: 0.25 },
                { answer: 'Ennui léger', score: 0.5 },
                { answer: 'Irritabilité ou agitation', score: 0.75 },
                { answer: 'Dépression ou anxiété', score: 1 },
            ],
        },
        {
            id: 17,
            question: 'Avez-vous déjà emprunté de l\'argent pour acheter des jeux vidéo ou du contenu lié aux jeux ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 18,
            question: 'Comment décririez-vous votre niveau de concentration pendant que vous jouez aux jeux vidéo ?',
            options: [
                { answer: 'Excellente', score: 0.25 },
                { answer: 'Bonne', score: 0.5 },
                { answer: 'Moyenne', score: 0.75 },
                { answer: 'Faible', score: 1 },
            ],
        },
        {
            id: 19,
            question: 'Avez-vous déjà ressenti des symptômes physiques tels que des maux de tête, des douleurs musculaires ou des troubles de la vision à cause d\'une session de jeu prolongée ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 20,
            question: 'Les jeux vidéo ont-ils eu un impact négatif sur votre productivité au travail ou à l\'école ?',
            options: [
                { answer: 'Aucun impact', score: 0.25 },
                { answer: 'Léger impact', score: 0.5 },
                { answer: 'Impact modéré', score: 0.75 },
                { answer: 'Impact significatif', score: 1 },
            ],
        },
        {
            id: 21,
            question: 'Combien de fois avez-vous négligé des activités importantes pour jouer aux jeux vidéo (ex : hygiène personnelle, tâches ménagères) ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 22,
            question: 'Avez-vous déjà eu des disputes familiales ou des conflits avec des amis à cause de votre temps passé à jouer aux jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 23,
            question: 'Quel est votre état émotionnel après avoir joué à des jeux vidéo pendant de longues périodes ?',
            options: [
                { answer: 'Énergisé et heureux', score: 0.25 },
                { answer: 'Fatigué mais satisfait', score: 0.5 },
                { answer: 'Irrité ou déprimé', score: 0.75 },
                { answer: 'Anxieux ou stressé', score: 1 },
            ],
        },
        {
            id: 24,
            question: 'Avez-vous déjà manqué des événements sociaux pour jouer aux jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 25,
            question: 'Avez-vous développé des routines spécifiques ou des rituels avant ou pendant le jeu vidéo (ex : superstitions, préparation spécifique) ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 26,
            question: 'Ressentez-vous le besoin constant de vérifier les mises à jour, les nouvelles versions ou les annonces de jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 27,
            question: 'Combien de temps par jour passez-vous à penser aux jeux vidéo lorsque vous ne jouez pas ?',
            options: [
                { answer: 'Quasiment jamais', score: 0.25 },
                { answer: 'Moins d\'une heure', score: 0.5 },
                { answer: '1 à 2 heures', score: 0.75 },
                { answer: 'Plus de 2 heures', score: 1 },
            ],
        },
        {
            id: 28,
            question: 'Avez-vous déjà caché ou minimisé la quantité de temps que vous passez à jouer aux jeux vidéo à vos proches ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 29,
            question: 'Ressentez-vous souvent de la culpabilité après avoir joué aux jeux vidéo pour une longue période ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 30,
            question: 'Avez-vous déjà manqué des engagements personnels ou professionnels en raison de sessions de jeu prolongées ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 31,
            question: 'Avez-vous eu des problèmes de mémoire ou de concentration en dehors du jeu après une session de jeu prolongée ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 32,
            question: 'Les jeux vidéo ont-ils eu un impact négatif sur votre vie sentimentale ?',
            options: [
                { answer: 'Aucun impact', score: 0.25 },
                { answer: 'Léger impact', score: 0.5 },
                { answer: 'Impact modéré', score: 0.75 },
                { answer: 'Impact significatif', score: 1 },
            ],
        },
        {
            id: 33,
            question: 'Avez-vous déjà sacrifié des activités physiques ou sportives pour jouer aux jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 34,
            question: 'Ressentez-vous le besoin de jouer aux jeux vidéo pour échapper à des problèmes ou à des sentiments négatifs ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 35,
            question: 'Avez-vous déjà ressenti des sautes d\'humeur importantes lorsque vous ne pouviez pas jouer aux jeux vidéo ?',
            options: [
                { answer: 'Jamais', score: 0.25 },
                { answer: 'Rarement', score: 0.5 },
                { answer: 'Parfois', score: 0.75 },
                { answer: 'Fréquemment', score: 1 },
            ],
        },
        {
            id: 36,
            question: 'Comment évalueriez-vous votre niveau de dépendance ou d\'attachement émotionnel aux jeux vidéo ?',
            options: [
                { answer: 'Faible', score: 0.25 },
                { answer: 'Modéré', score: 0.5 },
                { answer: 'Élevé', score: 0.75 },
                { answer: 'Très élevé', score: 1 },
            ],
        },
    ];
    const [answers, setAnswers] = useState({});

    const handleOptionChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const [contentArray, setContentArray] = useState([]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const contentJSON=JSON.stringify(contentArray);
        const updatedContentArray = Object.entries(answers).map(([questionId, answer]) => {
            const selectedQuestion = questions.find((question) => question.id.toString() === questionId);
            const cleanedAnswer = answer.replace(/^\d+-/, ''); // Remove the number and hyphen
            return {
                
                questionId,
                question: selectedQuestion ? selectedQuestion.question: '',
                cleanedAnswer,

            };
        });
        calculateScore(updatedContentArray);
        setContentArray(updatedContentArray);
        setIsModalVisible(true);
        const formData = {
            ID_Patient: 1, 
            Date_Questionnaire: new Date().toISOString(), 
            contentJSON,
            totalScore, 
            status, 
            recommandations,
            
        };
        axios.post('http://127.0.0.1:8000/api/questionnaire', formData)
        .then(response => {
            console.log(response.data);
            
        })
        .catch(error => {
            console.error('Error saving questionnaire data:', error);
            
        });
    };
    

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
        scrollToTop();
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onChange = (value) => {
        setCurrentStep(value);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalClose = () => {
        setIsModalVisible(false); // Hide the modal when closed
    };

    const [totalScore, setTotalScore] = useState(0); // State for the total score
    const [status, setStatus] = useState(''); // State for the status
    const [recommandations, setRecommandations] = useState(''); // State for the recommandations
    const [emoji, setEmoji] = useState(null);
    const calculateScore = (updatedContentArray) => {
        let score = 0;

        updatedContentArray.forEach(({ questionId, cleanedAnswer }) => {
            const selectedQuestion = questions.find((question) => question.id.toString() === questionId);
            if (selectedQuestion) {
                const selectedOption = selectedQuestion.options.find((option) => option.answer === cleanedAnswer);
                if (selectedOption) {
                    score += selectedOption.score;
                }
            }
        });
        switch (true) {
            case score > 0 && score < 10:
                setStatus('Niveau d\'engagement limité ou inexistant dans les jeu vidéo');
                setRecommandations(" Peu probable qu'il y ait une préoccupation majeure concernant une addiction aux jeux vidéo. Toutefois, il est recommandé de surveiller les habitudes de jeu pourprévenir toute évolution vers une dépendance");
                setEmoji(<SmileTwoTone />);
                break;
            case score > 11 && score < 20:
                setStatus('Implication modérée dans les jeux vidéo, mais sans indication claire d\'addiction');
                setRecommandations("Surveiller attentivement les habitudes de jeu et discuter avec le patient pourévaluer s'il existe des signes de dépendance potentielle");
                setEmoji(<MehTwoTone />);
                break;
            case score > 21 && score < 30:
                setStatus('Niveau modéré à élevé d\'attachements aux jeux vidéo ,suggérant des comportements pouvant être préoccupants.');
                setRecommandations("Intervention indispensable du médecin pour évaluer plus en détail les habitudes de jeu et envisager un plan de traitement ou des interventions préventives");
                setEmoji(<FrownTwoTone />);
                break;
            case score >= 31:
                setStatus('Niveau  très élevé voire excessif d\'implication dans les jeux vidéo,indiquant une forte probabilité d\'addiction');
                setRecommandations("Il est recommandé de consulter immédiatement un spécialiste de la santé mentale pour une évaluation approfondie et la mise en place d'un plan de traitement");
                setEmoji(<DislikeTwoTone />);
                break;

            default:
                break;
        }

        setTotalScore(score); // Update the state with the total score
    };
    const [isBordered, setIsBordered] = useState(window.matchMedia('(min-width: 587px)').matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 587px)');

        const handleMediaQueryChange = (e) => {
            setIsBordered(e.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);


    return (
        <Card style={{ width: '100%' }} size="large" bordered title='Questionnaire'>
            <Steps current={currentStep} size='default' style={{ marginBottom: '1rem', width: '100%' }} onChange={onChange}>
                <Step title="Profil" icon={<SolutionOutlined />} description='Informations personnelles' />
                <Step title="Évaluation" icon={<ProfileOutlined />} />
                <Step icon={<ProjectOutlined />} />
                <Step icon={<ReconciliationOutlined />} />
                <Step icon={<SmileOutlined />} />
                <Step title='Terminer' icon={<CheckCircleOutlined />} />
            </Steps>
            <Text>
                Questions {currentStep * 6 + 6} of {questions.length}
            </Text>
            <br />
            <br />
            {questions.slice(currentStep * 6, currentStep * 6 + 6).map((question, idx) => (
                <Card key={idx} style={{ width: '100%', marginBottom: '0.5rem' }} hoverable>
                    <Text strong>{question.question}</Text>
                    <br />
                    <br />
                    <Radio.Group onChange={(e) => handleOptionChange(question.id, e.target.value)}>
                        <Flex vertical gap={20}>
                            {question.options.map((option, index) => (
                                <Radio key={index} value={`${question.id}-${option.answer}`}>
                                    {option.answer}
                                </Radio>
                            ))}
                        </Flex>
                    </Radio.Group>
                    <br />
                    <br />
                </Card>
            ))}
            <Flex justify="space-between">
                {currentStep > 0 && (
                    <Button onClick={handlePrevious}>Précédent</Button>
                )}
                {currentStep < 5 && (
                    <Button type="primary" onClick={handleNext}>
                        Suivant
                    </Button>
                )}
                {currentStep === 5 && (
                    <Button type="primary" onClick={handleSubmit}>Envoyer</Button>
                )}
            </Flex>
            <Modal
                title="Answers Content"
                open={isModalVisible}
                onCancel={handleModalClose}
                style={{ top: 20 }}
                width={'90%'}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Fermer
                    </Button>,
                ]}
            >
                <Descriptions column={{ sm:1, md: 1, lg: 1, xl: 2, xxl: 2 }} bordered={isBordered} >
                    {contentArray.map(({ questionId, cleanedAnswer }) => {
                        const question = questions.find((q) => q.id === parseInt(questionId));
                        return (
                            <React.Fragment key={questionId}>
                                <Descriptions.Item label={`Question ${questionId}`}>
                                    {question ? question.question : ''}
                                </Descriptions.Item>
                                <Descriptions.Item label="Réponse">
                                    {cleanedAnswer}
                                </Descriptions.Item>
                            </React.Fragment>
                        );
                    })}

                    <Row gutter={16}>
                        <Statistic title={<h3>Niveau Addiction</h3>} value={status} prefix={emoji} valueStyle={{ fontSize: '1.1rem' }} />
                    </Row>
                    <Row gutter={16}>
                        <Statistic title={<h3>Score Total</h3>} value={totalScore} suffix={'/ 30 '} valueStyle={{ fontSize: '1.5rem',color:'red' }} />
                    </Row>
                    <Row gutter={16}>
                        <Statistic title={<h3>Recommandation</h3>} value={recommandations} prefix={<BulbTwoTone />} valueStyle={{ fontSize: '1rem' }} />
                    </Row>

                </Descriptions>
            </Modal>
        </Card>

    );
};
export default Questionnaire