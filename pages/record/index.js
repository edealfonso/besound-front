import Layout from '@/components/common/Layout';
import Info from '@/components/common/Info';
import { getRecordPageAPI } from '@/lib/api';
import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

export async function getServerSideProps() {
    const page = await getRecordPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function Record({ page }) {
    const { recordingStep } = useContext(AppContext);

    const renderStep = () => {
        switch (recordingStep) {
            case 1:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step1_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 2:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step2_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 3:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step3_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 4:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step4_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 5:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.phase2_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            default:
                return null;
        }
    };

    return <Layout>{renderStep()}</Layout>;
}
