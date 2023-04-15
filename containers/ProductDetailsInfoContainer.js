import { Accordion, ProductDetails } from '@/ksh-components'
import parse from 'html-react-parser'
import { marked } from 'marked'

export default function ProductDetailsInfoContainer({ medicine_details, medicine_info }) {
  // I dont know why this check is needed, but to fix the error in console :((
  if (!medicine_details || !medicine_info) {
    return null
  }

  const { description_rt, benefits_rt, side_effects_rt, doctor_suggestions_rt, how_to_rt, warnings_rt } =
    medicine_details

  return (
    <>
      <ProductDetails medicine_info={medicine_info} />
      <Accordion>
        <Accordion.Item>
          <Accordion.Title>A summary of the medicine</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {description_rt ? parse(marked.parse(description_rt)) : <p> Will post it soon </p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Title>Benefits</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {benefits_rt ? parse(marked.parse(benefits_rt)) : <p>Will post it soon</p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Title>Side effects</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {side_effects_rt ? parse(marked.parse(side_effects_rt)) : <p>Will post it soon</p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Title>Doctor recommendations</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {doctor_suggestions_rt ? parse(marked.parse(doctor_suggestions_rt)) : <p>Will post it soon</p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Title>How to use it</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {how_to_rt ? parse(marked.parse(how_to_rt)) : <p>Will post it soon</p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Title>Allergy warnings</Accordion.Title>
          <Accordion.AnswerWrapper>
            <Accordion.Answer>
              {warnings_rt ? parse(marked.parse(warnings_rt)) : <p>Will post it soon</p>}
            </Accordion.Answer>
          </Accordion.AnswerWrapper>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
