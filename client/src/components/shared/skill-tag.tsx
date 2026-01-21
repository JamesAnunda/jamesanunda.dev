interface SkillTagProps {
  name: string;
}

export default function SkillTag({ name }: SkillTagProps) {
  return (
    <span className="skill-tag px-4 py-2 bg-blue-50 dark:bg-gray-800 text-primary dark:text-blue-400 rounded-full text-sm font-medium">
      {name}
    </span>
  );
}
